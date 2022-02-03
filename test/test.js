let chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
let varkeeper = require("../src/index.js");

describe("varkeeper", () => {
  describe("use funtion", () => {
    it("OOP", () => {
      let x = new varkeeper.Prop("test", "value");
      assert.equal(x.get(), "value");
      x.delete();
    });

    it("OOP", () => {
      let x = new varkeeper.Prop("blub/test", "value");
      let y = new varkeeper.Prop("test", "value2");
      assert.equal(y.get(), "value2");
    });
  });
});
