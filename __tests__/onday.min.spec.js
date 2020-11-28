//const assert = require("assert");
//aconst expect = require("jest");
//const { expect } = require("chai");
//const { expect } = require("chai");
const onday = require("../onday.min");
const exec = require("child_process").exec;

beforeAll(() => {
  return new Promise((resolve, reject) => {
    process.stdout.write("beforeAll()");

    const child = exec(
      "npm run minifyJS && npm run version:add --silent",
      function (err, stdout, stderr) {
        if (err || stderr) reject(err, stderr);
        else {
          process.stdout.write(
            "minification complete. Now run tests on minified code."
          );

          resolve(stdout);
        }
      }
    );
  });
});

/*jest.mock("http");

//http.get.mockResolvedValue("hello world");

/*
jest.mock("../onday.min.js", () => {
  return {
    check: jest.fn().mockImplementation(() => 1.42),
  };
});
*/

describe("noday()", () => {
  const a = new onday();
  const dnow = new Date();
  //******************************************************************************** */
  //console.log(`a: ${JSON.stringify(a}`);

  test("it should work an object, get current date and month, check object values", () => {
    expect(typeof a).toBe("object");

    const expected = { d: dnow.getDate(), m: dnow.getMonth() + 1 };
    // console.log(a);
    expect(a).toMatchObject(expected);
  });
  //******************************************************************************** */
});

describe("check()", () => {
  const a = new onday();
  const dnow = new Date();
  test("pass in 15 and 11 (15 Nov), check output", async () => {
    const w = await a.check(15, 11, true);
    //console.log(`w:${w}`);

    expect(w).toMatch(/On Nov.+?15.+/);
    expect(true).toBe(true);
  });
  //******************************************************************************** */
  test("pass INVALID DAY AND MONTH values - Promise catch a rejection - check text", async () => {
    try {
      let t = await a.check("blah", 666, true); //SHOULD REJECT TO THE CATCH PART!
      console.log(`t: ${t}`);
      //Failed: "Error: invalid date values (null, null)"

      expect(t).toContain("should not come here, should reject - catch!");
      expect(t).rejects.toEqual("Error: invalid date values");
      //expect(t).toMatch(/invalid date values/);
      //expect(t).toContain("is the day");
    } catch (e) {
      //console.log(`e: ${e}`);
      expect(e).toContain("invalid date");
    }
  });
  //******************************************************************************** */
  test("pass in INVALID DAY but VALID MONTH ('xxx',6)", async () => {
    new onday()
      .check("xxx", 6, true)
      .then((d) => {
        console.log("d:" + d);
        expect(d).toMatch("SHOULD NOT SEE THIS!!!, SHOULD FAIL");
      })
      .catch((e) => {
        //expect(e).toMatch("ffrror");
        //console.log("catch-" + e);
        expect(e).toMatch(/invalid date values.+/);
      });

    expect(1234).toBe(1234);
  });
  //******************************************************************************** */
  test("pass in VALID DAY but INVALID MONTH (15,'xxx')", async () => {
    new onday()
      .check(15, "XXXA", true)
      .then((d) => {
        console.log("ERROR, SHOULD NOT SEE THIS OUTPUT!!:" + d);
        //expect(d).toMatch("Errrrrr");
      })
      .catch((e) => {
        //expect(e).toMatch("ffrror");
        //console.log("catch-" + e);
        expect(e).toMatch(/invalid date values.+/);
      });

    expect(1234).toBe(1234);
  });
  //******************************************************************************** */
  test("6. pass in NO VALUES (), expect current date with info", async () => {
    await new onday()
      .check(undefined, undefined, true)
      .then((d) => {
        process.stdout.write(`6. d: ${d}\n`);

        //expect(d).toMatch("Errrrrr");
        //const regex = new RegExp(`[${item}]`, "g");

        const reg = new RegExp(`${dnow.getDate()}.+is the day`, "g");
        expect(d).toMatch(reg);
        expect(1234).toBe(1234);
      })
      .catch((e) => {
        //expect(e).toMatch("ffrror");
        console.log("catch-" + e);
        expect(fe).toMatch(/xxxshould not see this /);
      });
    expect(1234).toBe(1234);
  });
  //******************************************************************************** */
});
//******************************************************************************** */
//******************************************************************************** */
//******************************************************************************** */
//******************************************************************************** */
describe("getdate()", () => {
  const a = new onday();
  const dnow = new Date();

  test("try 23,4 = 23rd Apr", () => {
    a.getdate(23, 4)
      .then((x) => {
        //console.log(`getdate = ${x}`);
        expect(x).toMatch(/23rd Apr/);
        expect(true).toBe(true);
      })
      .catch((e) => {
        console.error(e);
        expect(true).toBe(false);
      });
  });
  test("try 31,1 = 31st Jan", () => {
    a.getdate(31, 1)
      .then((x) => {
        //console.log(`getdate = ${x}`);
        expect(x).toMatch(/31st Jan/);
        expect(true).toBe(true);
      })
      .catch((e) => {
        console.error(e);
        expect(true).toBe(false);
      });
  });
  test("try 2,7 = 2nd Jul", () => {
    a.getdate(2, 7)
      .then((x) => {
        //console.log(`getdate = ${x}`);
        expect(x).toMatch(/2nd Jul/);
        expect(true).toBe(true);
      })
      .catch((e) => {
        console.error(e);
        expect(true).toBe(false);
      });
  });
  test("try 8,10 = 8th Oct", () => {
    a.getdate(8, 10)
      .then((x) => {
        //console.log(`getdate = ${x}`);
        expect(x).toMatch(/8th Oct/);
        expect(true).toBe(true);
      })
      .catch((e) => {
        console.error(e);
        expect(true).toBe(false);
      });
  });
  test("try 31,11 = 31st Nov - Expect Failure - invalid date", () => {
    a.getdate(31, 11)
      .then((x) => {
        //console.log(`getdate = ${x}`);
        expect(x).toMatch(/dont see here/);
        expect(true).toBe(false);
      })
      .catch((e) => {
        expect(e).toMatch(/Date is invalid/);
        //console.error(e);
        //expect(true).toBe(true);
      });
  });
});
//******************************************************************************** */
