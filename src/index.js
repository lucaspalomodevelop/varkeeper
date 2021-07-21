let props = [];
let events = [];

function setprop(name, value) {

    if (value instanceof Function) {
        value = value();
    }


    var myprop = props.find(x => x.name === name)


    if (myprop != undefined) {
        myprop.value = value;
    }
    else {
        props.push({ name: name, value: value });
    }

    onchange_func(name, value);

}

function getEventsFromTypeAndName(name, type) {
    let event = [];
    if (events.length > 0) {
        event = events.filter(x => x.name === name && x.type === type)
    }
    return event;
}

function getprop(name) {
    let result = props.find(x => x.name === name)
    if (result != undefined) {
        return result.value;
    }
    else {
        return undefined;
    }
}

function deleteprop(name) {
    let index = props.indexOf(props.find(x => x.name === name));
    props.splice(index, 1);
}

function onchange(name, callback) {
    events.push({ name: name, callback: callback, type: 'onchange' });
}

function onchange_func(name, value) {
    if (events.length > 0) {
        let onchangeevents = getEventsFromTypeAndName(name, 'onchange');

        onchangeevents.forEach(element => {
            element.callback(value);
        });
    }
}



module.exports = { setprop, getprop, onchange, deleteprop }