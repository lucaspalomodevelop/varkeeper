let props = [];
let events = [];

class Prop {
  constructor(name, value = undefined) {
    let namescpace_reg = /[a-z]*[^\/]$/;
    this.name = namescpace_reg.exec(name)[0];
    this.namespace = name.replace(this.name, "");
    if (this.namespace === "") {
      this.namespace = "global/";
    }
    this.value = value;
    this.set(value);

    console.log(this.namespace);
    // console.log(this.name);
  }
  set(value) {
    if (value instanceof Function) {
      value = value();
    }
    var myprop = props.find(
      (x) => x.name === this.name && x.namespace === this.namespace
    );

    if (myprop != undefined) {
      props.value = value;
    } else {
      props.push({
        name: this.name,
        value: value,
        namespace: this.namespace,
      });
    }
  }
  get() {
    let result = props.find(
      (x) => x.name === this.name && x.namespace === this.namespace
    );
    return result.value;
  }

  delete() {
    props = props.filter(
      (x) => x.name !== this.name && x.namespace !== this.namespace
    );
  }
}

if (process.env.test === "true") {
  console.log("test");
} else {
  module.exports = { Prop };
}
