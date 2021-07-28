let props = [];
let events = [];

Prop = function (name, value = undefined) {
  this._init(name, value);
};
Prop.prototype = {
  constructor: Prop,
  name: null,
  value: null,
  _init: function (name, value = undefined) {
    if (
      (value === undefined || value === null) &&
      props.find((x) => x.name === name) !== undefined
    ) {
      myprop = props.find((x) => x.name === name);
      setprop(name, myprop.value);
      this.value = myprop.value;
    } else {
      setprop(name, value);
      this.value = value;
    }

    this.name = name;
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
    on(this.name, eventname, callback);
  },
  use: function (callback) {
    use(this.name, callback);
  },
};

/**
 * @param {String} name
 * @param  {any} value
 * @public
 */
function setprop(name, value) {
  if (value instanceof Function) {
    value = value();
  }

  var myprop = props.find((x) => x.name === name);

  if (myprop != undefined) {
    on_function("set", name, value);
    if (value !== myprop.value) {
      myprop.value = value;
      on_function("change", name, value);
    }
  } else {
    props.push({ name: name, value: value });
    on_function("create", name, value);
  }
}

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
  props = props.filter((x) => x.name !== name);
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
  let value = getprop(name);

  callback(value);

  deleteprop(name);
}

module.exports = { setprop, getprop, deleteprop, on, Prop };
