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
          .then(({ message }) => console.log("data", message))
          .catch((err) => console.log(err));
      });
    }
  });

  set++;
}, 10000);

if (set > allZipCodes) {
  clearInterval(getResultSaveToMongo);
}
