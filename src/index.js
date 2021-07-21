let props = [];
let events = [];

function setprop(name, value) {

    if (value instanceof Function) {
        value = value();
    }

    props[name] = value;
    if (events.length > 0) {
        let onchangeevents = events.filter(x => x.name === name && x.type === 'onchange')

        onchangeevents.forEach(element => {
            element.callback(value);
        });
    }
}

function getprop(name) {
    return props[name];
}

function onchange(name, callback) {
    events.push({ name: name, callback: callback, type: 'onchange' });
}

function ifistrue(name, condition , callback) {
    
    if(condition) {
        callback();
    }
    events.push({ name: name, callback: callback, type: 'ifistrue' });
}



module.exports = { setprop, getprop, onchange }