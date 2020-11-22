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
