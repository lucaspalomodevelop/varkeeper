let props = [];
let events = [];

function setprop(name, value) {

    if (value instanceof Function) {
        value = value();
    }

    props[name] = value;
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
    return props[name];
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


module.exports = { setprop, getprop, onchange }