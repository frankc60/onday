const https = require("http");

/**
 * class onday
 * @params  d - day of month
 * @params  m - month value
 *
 *
 * WORKLFOW
 * >npm run production
 * >npm publish (to publish to npm registry - don't need to do everytime!)
 * >git push (chages should already be committed)
 */

class onday {
  static _PRV_NOW_MONTH = new Date().getMonth() + 1; //need to convert to private with a # but this is not implemented yet in terser minifier..
  static _PRV_NOW_DAY = new Date().getDate();

  static _init = (d, v) => {
    //console.log(v + ": typeof d: " + typeof d);
    if (typeof d == "number" || typeof d != undefined) {
      if (v == "day") {
        if (d < 33 && d > 0) {
          return d;
        } else {
          return onday._PRV_NOW_DAY;
        }
      } else {
        // v == month
        if (d > 0 && d < 13) {
          return d;
        } else {
          return onday._PRV_NOW_MONTH;
        }
      }
    } else return null;
  };

  constructor(d, m) {
    this.d = onday._init(d, "day");
    this.m = onday._init(m, "month");

    this.months = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
  }

  doy(dd = onday._PRV_NOW_DAY, mm = onday._PRV_NOW_MONTH) {
    return new Promise(async (resolve, reject) => {
      try {
        const thisYear = new Date(); //just used current year.
        //console.log(dd, mm);
        const today = new Date(thisYear.getFullYear(), mm - 1, dd, 1, 0, 1, 0); // month is 0 based, need to add 1
        let doy = await Math.ceil(
          (today - new Date(today.getFullYear(), 0, 1)) / 86400000
        );
        resolve({ date: today, result: doy }); //add one because is 0 based, ie, 1 jan is day 0, should be day 1 !!
      } catch (error) {
        reject(`Error 3: ${error}`);
      }
    });
  }

  workoutdate(d = this.d, m = this.m) {
    // d = 5, m = 6

    return new Promise((resolve, reject) => {
      try {
        if (typeof d == "number" && typeof m == "number") {
          if (d < 33 && (d > 0) & (m > 0) && m < 13) {
            const now = new Date();
            const properdate = new Date(now.getFullYear(), m - 1, d);
            resolve(
              `passed in (${d}, ${m}) and ${now.getFullYear()} = ${properdate}
              ${this.months[m - 1]}
              `
            );
          } else {
            reject("Number values out of range.");
          }
        } else {
          reject("Values of wrong type. Expecting numbers");
        }
      } catch (er) {
        reject(er);
      }
    });
  }

  check(d = this.d, m = this.m) {
    //console.log(`d:${d} - ${this.months[m]}`);

    return new Promise((resolve, reject) => {
      //console.log("checking for d,m" + d + "," + m);
      if (!(d = onday._init(d, "day")) || !(m = onday._init(m, "month"))) {
        reject("date value invalid");
      }
      https
        .get(`http://numbersapi.com/${m}/${d}/date`, (resp) => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            if (/title\>Error/.test(data)) {
              reject(`Error 3:${data}`);
            } else resolve(data);
            //console.log(JSON.parse(data).explanation);
          });
          resp.on("error", (er) => {
            reject("Error 1:" + er);
          });
        })
        .on("error", (err) => {
          reject("Error 2: " + err.message);
        });
    });
  }
}

module.exports = onday;

/*
const test = new onday();
test
  .check(15, 1)
  .then((x) => {
    console.log(`x: ${x}`);
    return test.check(8, 10);
  })
  .then((b) => {
    console.log(`b: ${b}`);
  });
*/
/*
const fn = async (d, m) => {
  let contents = await new onday().check(d, m);
  console.log(`contents: ${contents}`);
  await new onday().workoutdate();
};
fn(8, 10);
fn("sdf", 1); //can be called multiple times!
fn(10, 8);
*/
