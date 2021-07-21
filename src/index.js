let props = [];
let events = [];

// Prop = function(name, value = undefined) {
//     this._init(name, value);
//   //  props.push({ name: name, value: value });
// }
// Prop.prototype = {

//   constructor: Prop,
//   name: null,
//   value: null,
//   _init: function(name, value = undefined) {

//     if(value === undefined && props.find(x => x.name === name) !== undefined)
//     {
//         myprop = props.find(x => x.name === name);
//         console.log(myprop)
//         setprop(name, myprop.value);    
//     }
//     else
//     {
//         setprop(name, value);
//     }
//     // 
//     // this.value = value;

//   },
//    set: function (value) {setprop(this.name, value);},
//    get: function () {return getprop(this.name);},
//    delete: function () {deleteprop(this.name);},
//     on: function(eventname, callback) {
//     events.push({ type: eventname, callback: callback, name: this.name });
//   }
// }


function setprop(name, value) {

    if (value instanceof Function) {
        value = value();
    }


   var myprop = props.find(x => x.name === name)


   if(myprop != undefined)
   {
     myprop.value = value;
   }
   else
   {
   // props.push(new Prop(name, value));
    props.push({ name: name, value: value });
   }

    onchange_func(name, value);
   
}

function getEventsFromTypeAndName(name,type) {
    let event = [];
    if (events.length > 0) {
     event = events.filter(x => x.name === name && x.type === type)
    }
    return event;
}

function getprop(name) {
    console.log(props)
    let result = props.find(x => x.name === name)
    if(result != undefined)
    {
        return result.value;
    }
    else
    {
        return undefined;
    }
}

function deleteprop(name) {
    let index = props.indexOf(props.find(x => x.name === name));
    props.splice(index,1);
}

function onchange(name, callback) {
    events.push({ name: name, callback: callback, type: 'onchange' });
}

function onchange_func(name,value){
    if (events.length > 0) {
        let onchangeevents = getEventsFromTypeAndName(name, 'onchange');

        onchangeevents.forEach(element => {
            element.callback(value);
        });
    }
}



module.exports = { setprop, getprop, onchange, deleteprop }