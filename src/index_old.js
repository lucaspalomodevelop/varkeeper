let props = [];
let events = [];
// let CONST_props = [];

// (function init (){

//   let CONST_props = require("./_CONST.js");

// }())



Prop = function (name, value = undefined) {
  this._init(name, value);
};
Prop.prototype = {
  constructor: Prop,
  name: null,
  value: null,
  namespace: "global",
  _init: function (name, value = undefined) {
    name = DissolveNameAndNamespace(name).name;
    let namespace = DissolveNameAndNamespace(name).namespace;
    if (
      (value === undefined || value === null) &&
      props.find((x) => x.name === name && x.namespace === namespace) !==
        undefined
    ) {
      myprop = props.find((x) => x.name === name && x.namespace === namespace);
      setprop(name, myprop.value);
      this.value = myprop.value;
    } else {
      setprop(name, value);
      this.value = value;
    }
    this.name = name;
    this.namespace = namespace;
  },
  set: function (value) {
    setprop(this.name, value);
  },
  get: function () {
    return getprop(this.name);
  },
  delete: function () {
    deleteprop(this.name);
  },
  on: function (eventname, callback) {
    on(eventname, this.name, callback);
  },
  use: function (callback) {
    use(this.name, callback);
  },
};

getPropsByNamespace = function (namespace) {
  return props.filter((x) => x.namespace === namespace);
};

/**
 * @param {String} name
 * @public
 * @desciption Dissolve name and namespace from name string (Namespace/name)
 * @returns {name, namespace}
 */
DissolveNameAndNamespace = function (name) {
  let namespace = "global";
  let myname = name;
  if (name.indexOf("/") > -1) {
    let split = name.split("/");
    namespace = split[0];
    myname = split[1];
  } else {
    myname = name;
    namespace = "global";
  }
  return {
    namespace: namespace,
    name: myname,
  };
};

// DissolveNameAndNamespace = function (name) {
//   let namespace = "global";
//   let myname = name;
//   if (name.indexOf("/") > -1) {
//     let split = name.split("/");
//     namespace = split.slice(0, split.length - 1);
//     myname = split[split.length];

//   } else {
//     myname = name;
//     namespace = "global";
//   }
//   return {
//     namespace: namespace,
//     name: myname,
//   };

NamespaceArrayToString = function (namespace) {
  let str = "";
  for (let i = 0; i < namespace.length; i++) {
    str += namespace[i];
    if (i < namespace.length - 1) {
      str += "/";
    }
  }
  return str;
};

NamespaceStringToArray = function (namespace) {
  let namespaceArray = [];
  if (namespace.indexOf("/") > -1) {
    namespaceArray = namespace.split("/");
  } else {
    namespaceArray.push(namespace);
  }
  return namespaceArray;
};

/**
 * @param {String} name
 * @param  {any} value
 * @public
 */
function setprop(name, value) {
  console.log(props);

  name = DissolveNameAndNamespace(name).name;
  let namespace = DissolveNameAndNamespace(name).namespace;

  if (value instanceof Function) {
    value = value();
  }

  var myprop = props.find((x) => x.name === name && x.namespace === namespace);

  if (myprop != undefined) {
    on_function("set", name, value);
    if (value !== myprop.value) {
      myprop.value = value;
      on_function("change", name, value);
    }
  } else {
    props.push({ name: name, value: value, namespace: namespace });
    on_function("create", name, value);
  }
}

/**
 * @param {String} name
 * @public
 * @returns {any}
 * @description Get prop value
 * @example getprop("name")
 * @example getprop("namespace/name")
 */
function getEventsFromTypeAndName(name, type) {
  let event = [];
  if (events.length > 0) {
    event = events.filter((x) => x.name === name && x.type === type);
  }
  return event;
}
/**
 * @param {String} name
 * @public
 */
function getprop(name) {
  let result = props.find((x) => x.name === name);
  if (result != undefined) {
    on_function("get", name, result.value);
    return result.value;
  } else {
    return undefined;
  }
}

/**
 * @param {String} name
 * @public
 */
function deleteprop(name) {
  name = DissolveNameAndNamespace(name).name;
  let namespace = DissolveNameAndNamespace(name).namespace;
  props = props.filter((x) => x.name !== name && x.namespace !== namespace);
}

/**
 * @param {String} eventtype
 * @param {String} name
 * @param {Function} callback
 * @public
 */
function on(eventname, name, callback) {
  events.push({ type: eventname, callback: callback, name: name });
}

function on_function(eventname, name, value) {
  let events = getEventsFromTypeAndName(name, eventname);
  if (events.length > 0) {
    switch (eventname) {
      case "change":
      case "create":
      case "get":
      case "set":
        events.forEach((x) => x.callback(value));
        break;

      default:
        events.forEach((x) => x.callback({ err: 404, msg: "Event not found" }));
        break;
    }
  }
}

function use(name, callback) {
  if (name instanceof Prop) {
    name = name.name;
  }

  let value = getprop(name);

  if (value === undefined) {
    value = name;
    const { v4: uuidv4 } = require("uuid");
    name = uuidv4();
    setprop(name, value);
  }

  callback(value);

  deleteprop(name);
}

if (process.env.test === "true") {
  console.log("test");
} else {
  module.exports = { setprop, getprop, deleteprop, on, Prop, use };
}
