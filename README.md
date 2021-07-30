# varkeeper

![npm](https://img.shields.io/npm/v/varkeeper)
![NPM](https://img.shields.io/npm/l/varkeeper)
[![Downloads](https://img.shields.io/npm/dm/varkeeper)](https://www.npmjs.com/package/varkeeper)

[![NPM](https://nodei.co/npm/varkeeper.png)](https://www.npmjs.com/package/varkeeper)

## Desciption

varkeeper is A tool for handle vars global in different modules

## Usage

### Installation

You can colormizer install using [npm](https://www.npmjs.com/package/varkeeper) or [yarn](https://yarnpkg.com/package/varkeeper).

```
npm install varkeeper
```

```
yarn add varkeeper
```

```javascript
var vk = require('varkeeper');
```
## Functional

### set propertie

```javascript
vk.setprop("varName", "varValue");
```

### get propertie

```javascript
vk.getprop("varName");
```

### events

```javascript
vk.on("eventType",'varName', function(value){
    //do something
}
```

evnetTypes:

- set
- get
- change

## OOP

### init propertie

```javascript
var vkObj = new vk.Prop("varName", "varValue");
```

### reference on exist propertie

```javascript
var vkObj = new vk.Prop("varName");
```

### set propertie

```javascript
vkObj.set("varValue");
```

### get propertie

```javascript
var vkObj = new vk.Prop("varName", "varValue");
vkObj.get();
```

### events

```javascript
vkObj.on("eventType", function (value) {
  //do something
});
```

evnetTypes:

- set
- get
- change
