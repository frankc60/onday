const assert = require("assert");
const { expect } = require("chai");
const onday = require("../onday.min");

describe("check()", () => {
  it("method epected to return a string containing 'is the day'", async () => {
    const defn = new onday();
    const result = await defn.check();

    //assert.equals(result, "d");
    //assert.doesNotThrow(result);
    expect(result).to.be.string("is the day");
  });

  it("method should be able to handle just one number", async () => {
    const defn = new onday();
    const result = await defn.check(15);
    //console.log(result);
    //expect(result).to.not.throw("Error");
    expect(result).to.contain.string("15th");
  });

  it("method should not accept string text values", async () => {
    const defn = new onday();
    const result = await defn.check("xxx");
    //console.log(result);
    //expect(result).to.be.string("<title>Error</title>");
    expect(result).to.contain.string("<title>Error</title>");
  });

  it("method should default to todays date if no values passed", async () => {
    const defn = new onday();
    const result = await defn.check();
    //console.log(result);
    const d = new Date();
    //console.log(d.getDate());
    expect(result).to.contain.string(d.getDate());
  });
});

describe("workoutdate()", () => {
  it("method epected to return todays date", async () => {
    const defn = new onday();
    const result = await defn.workoutdate();
    //console.log(result);
    const d = new Date();
    //console.log(d.getDate());
    expect(result).to.contain.string(d.getDate());
    expect(result).to.contain.string(d.getMonth() + 1);
    expect(result).to.contain.string(d.getFullYear());
  });
  it("method epected to match passed in values", async () => {
    const defn = new onday();
    const result = await defn.workoutdate(8, 10);
    //console.log(result);
    const d = new Date();
    //console.log(d.getDate());
    expect(result).to.contain.string("08");
    expect(result).to.contain.string("Oct");
    expect(result).to.contain.string(d.getFullYear());

    const result2 = await defn.workoutdate(26, 2);
    //console.log(result2);
    expect(result2).to.contain.string("26");
    expect(result2).to.contain.string("Feb");
    expect(result2).to.contain.string(d.getFullYear());
  });

  it("method expecting numeric values", async () => {
    const defn = new onday();
    try {
      const result = await defn.workoutdate("eight", 10);
      //console.log(result);
      const d = new Date();
      //console.log(d.getDate());
      expect(result).to.throw();
    } catch (e) {
      //console.log("e!" + e);
      //expect(Promise.resolve()).to.be.a("promise");
      expect(e).to.be.a("string");
      expect(e).to.contain("Values of wrong type. Expecting numbers");
      //expect(Promise.reject("caw")).to.reject;
    }

    //expect(result).to.contain("Values of wrong type. Expecting numbers");
  });
});
