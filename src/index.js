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

  constructor(d = onday._PRV_NOW_DAY, m = onday._PRV_NOW_MONTH) {
    this.d = d;
    this.m = m;
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
        console.log(dd, mm);
        const today = new Date(thisYear.getFullYear(), mm - 1, dd, 1, 0, 1, 0); // month is 0 based, need to add 1
        let doy = await Math.ceil(
          (today - new Date(today.getFullYear(), 0, 1)) / 86400000
        );
        resolve([doy, today]); //add one because is 0 based, ie, 1 jan is day 0, should be day 1 !!
      } catch (error) {
        reject(`Error 3: ${error}`);
      }
    });
  }

  check(d = this.d, m = this.m) {
    //console.log(`d:${d} - ${this.months[m]}`);

    return new Promise((resolve, reject) => {
      https
        .get(`http://numbersapi.com/${m}/${d}/date`, (resp) => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            resolve(data);
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
const fn = async () => {
  let contents = await new onday(25, 12).check();
  console.log(`contents: ${contents}`);
};
fn();
fn(); //can be called multiple times!
*/
