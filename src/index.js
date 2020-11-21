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
  constructor(d, m) {
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
            reject("Error1:" + er);
          });
        })
        .on("error", (err) => {
          reject("Error2: " + err.message);
        });
    });
  }
}

module.exports = onday;
