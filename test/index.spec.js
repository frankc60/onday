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
});
