//const assert = require("assert");
//const expect = require("jest");
const onday = require("../onday.min");

describe("check()", () => {
  const a = new onday();
  const dnow = new Date();

  //console.log(a);
  test("it should work an object", () => {
    expect(typeof a).toBe("object");
  });
  test("should contain todays date values: day & month", () => {
    expect(a.d).toEqual(dnow.getDate());
    expect(a.m).toEqual(dnow.getMonth() + 1);
  });

  test("run a regex match", () => {
    //expect(a).toMatch(/Feb/);
  });

  test("run a regex match", async () => {
    let t = await a.check();
    // console.log(t);
    expect(t).toMatch(/is the day.+/);
    //expect(t).toContain("is the day");
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
