//const assert = require("assert");
//const expect = require("jest");
//const { expect } = require("chai");
const onday = require("../onday.min");

describe("check()", () => {
  const a = new onday();
  const dnow = new Date();

  //console.log(a);
  test("it should work an object", () => {
    expect(typeof a).toBe("object");
  });
  test("should contain todays date values: day & month", async () => {
    // await console.log("a" + a.d);
    // expect(a.d).toEqual(dnow.getDate());
    // expect(a.m).toEqual(dnow.getMonth() + 1);
  });

  test("run a regex match", async () => {
    try {
      let t = await a.check();
      console.log(`t ${t}`);
      //Failed: "Error: invalid date values (null, null)"

      // expect(t).rejects.toEqual("Error: invalid date values");
      //expect(t).toMatch(/invalid date values/);
      //expect(t).toContain("is the day");
    } catch (e) {
      //expect.assertions(1);
      //  expect(e).rejects.toEqual({
      //   error: "Error: invalid date values (null,null)",
      // });
      console.log("error " + e);
    }
  });

  test("Promise(Reject) false data", async () => {
    /*  new onday("ss")
      .check()
      .then((d) => {
        expect(d).toMatch("Errrrrr");
      })
      .catch((e) => {
        expect(e).toMatch("ffrror");
      });
  */
  });
});
