const https = require("http");

class onday {
  constructor(d, m) {
    this.d = d;
    this.m = m;
  }

  check() {
    return new Promise((resolve, reject) => {
      https
        .get(`http://numbersapi.com/${this.m}/${this.d}/date`, (resp) => {
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
module.exports.onday;
