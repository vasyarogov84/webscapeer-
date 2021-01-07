const fs = require("fs");
const zipCodes = require("../data/zipCodes.json");
const axiosGraphql = require("./axiosGraphql");

const currentStateCities = zipCodes[2].cities;
let current = 0;

const getResultSaveToMongo = setInterval(() => {
  fs.readFile("../result.json", async (err, data) => {
    const json = await JSON.parse(data);

    if (json.length) {
      console.log("🚀 ~ file: index.js ~ line 13 ~ fs.readFile ~ json", json)
      await json.map(async (ell,i) => {
        await axiosGraphql(ell, json.length, i)
          .then((data) => console.log("data", data))
          .catch((err) => {
            clearInterval(getResultSaveToMongo)
            console.log(err)});
      });
    }
  });

  current +=10;
  if (current > currentStateCities.length) {
    clearInterval(getResultSaveToMongo);
  }
}, 200000);


 
  // if () {
  //   clearInterval(getResultSaveToMongo);
  // }