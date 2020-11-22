const https = require("http");

/**
 * class onday
 * @params  d - day of month
 * @params  m - month value
 *
 *
 * WORKLFOW
 * >npm run production
 * >git add . && git commit -m "updates" && git push
 * >npm publish (to publish to npm registry - don't need to do everytime!)
 */

class onday {
  static _PRV_NOW_MONTH = new Date().getMonth() + 1; //need to convert to private with a # but this is not implemented yet in terser minifier..
  static _PRV_NOW_DAY = new Date().getDate();

  constructor(d = onday._PRV_NOW_DAY, m = onday._PRV_NOW_MONTH) {
    this.d = d;
    this.m = m;
  }

  doy(dd = onday._PRV_NOW_DAY, mm = onday._PRV_NOW_MONTH) {
    return new Promise(async (resolve, reject) => {
      try {
        const thisYear = new Date(); //just used current year.
        console.log(dd, mm);
        const today = new Date(
          thisYear.getFullYear(),

          mm - 1,
          dd,

          1,
          0,
          1,
          0
        ); // month is 0 based, need to add 1
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
