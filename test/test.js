let chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
let varkeeper = require("../src/index");

describe("varkeeper", () => {
  describe("setprop", () => {
    it("will set a prop", () => {
      varkeeper.setprop("test", "value");
      //let a = new varkeeper.Prop('test')
      assert.equal(varkeeper.getprop("test"), "value");
    });
    it("will set a prop as array", () => {
      varkeeper.setprop("array", []);
      expect(varkeeper.getprop("array")).to.be.an("array");
    });
    it("will set a prop as array with funtion return", () => {
      varkeeper.setprop("array", () => {
        return [];
      });
      expect(varkeeper.getprop("array")).to.be.an("array");
    });
    it("will slice a array-prop", () => {
      varkeeper.setprop("array", [1, 2, 3, 4]);
      let x = varkeeper.getprop("array");
      let y = x.slice(0, 2);
      expect(y).to.be.eql([1, 2]);
    });
  });
  describe("getprop", () => {
    it("will get prop from first test", () => {
      assert.equal(varkeeper.getprop("test"), "value");
    });
    it("will get not init prop", () => {
      assert.equal(varkeeper.getprop("test1"), undefined);
    });
  });

  describe("deleteprop", () => {
    it("will detelte prop", () => {
      varkeeper.setprop("test", "value");
      varkeeper.deleteprop("test");
      assert.equal(varkeeper.getprop("test"), undefined);
    });
  });
  describe("onchange", () => {
    it("will call funtion by change prop value", () => {
      let a = false;
      varkeeper.on("change", "test", () => {
        a = true;
      });
      varkeeper.setprop("test", "value");
      varkeeper.setprop("test", "value2");
      assert.equal(a, true);
    });
  });

  describe("varkeeper porp class", () => {
    it(" will setprop an prop of same value must be the same #1", () => {
      varkeeper.setprop("test", "value");
      let x = new varkeeper.Prop("test");
      assert.equal(x.get(), varkeeper.getprop("test"));
    });

    it(" will setprop an prop of same value must be the same #2", () => {
      let x = new varkeeper.Prop("test", "value");
      assert.equal(x.get(), varkeeper.getprop("test"));
    });
  });

  describe("varkeeper porp class on set", () => {
    it(" on set  eq value", () => {
      let result = false;
      varkeeper.on("set", "setprop", (value) => {
        result = true;
      });
      let x = new varkeeper.Prop("setprop", "firstvalue");
      x.set("firstvalue");
      assert.equal(result, true);
    });

    it(" on set not eq value", () => {
      let result = false;
      varkeeper.on("set", "setprop", (value) => {
        result = true;
      });
      let x = new varkeeper.Prop("setprop", "firstvalue");
      x.set("secoundvalue");
      assert.equal(result, true);
    });
  });

  describe("varkeeper porp class on change", () => {
    it(" on change  eq value", () => {
      let result = true;
      varkeeper.on("change", "changeprop", (value) => {
        result = false;
      });
      let x = new varkeeper.Prop("changeprop", "firstvalue");
      x.set("firstvalue");
      assert.equal(result, true);
    });

    it(" on change not eq value", () => {
      let result = false;
      let x = new varkeeper.Prop("changeprop", "firstvalue");
      varkeeper.on("change", "changeprop", (value) => {
        result = true;
      });
      x.set("secoundvalue");
      assert.equal(result, true);
    });
  });

  describe("varkeeper porp class on create", () => {
    it(" on create  eq value", () => {
      let result = false;
      varkeeper.on("create", "createprop", (value) => {
        result = true;
      });
      let x = varkeeper.setprop("createprop");
      assert.equal(result, true);
    });

    it(" on create  eq value OOP", () => {
      let result = false;
      varkeeper.on("create", "createpropoop", (value) => {
        result = true;
      });
      let x = new varkeeper.Prop("createpropoop", "firstvalue");
      assert.equal(result, true);
    });
  });

  describe("varkeeper use funtion OOP", () => {
      let x = new varkeeper.Prop("test", "value");
      x.use((value) => {
        console.log(value);
      });
  });


});
