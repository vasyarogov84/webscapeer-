const fs = require("fs");
const axiosGraphql = require("./axiosGraphql");

const zipCodes = require("../data/zipCodes.json");
const allZipCodes = zipCodes.length;
console.log("allZipCodes", allZipCodes);
let set = 0;

const getResultSaveToMongo = setInterval(() => {
  fs.readFile("../result.json", async (err, data) => {
    const json = await JSON.parse(data);

    if (json.length) {
      json.map(async (ell) => {
        await axiosGraphql(ell)
          .then((data) => console.log("data", data))
          .catch((err) => console.log(err));
      });
    }
  });

  set++;
}, 100000);

if (set > allZipCodes) {
  clearInterval(getResultSaveToMongo);
}