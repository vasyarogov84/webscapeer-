const fs = require("fs");
const states = require("../data/allStates");
const sorted = require("./scrapeData.json");

const finalShape = [];

states.map((state) => {
  const current = sorted.filter((el) => state === el.state);
  if (current.length) {
    const city_zip = current.map(({ city, zip_code }) => ({ city, zip_code }));
    finalShape.push({
      state,
      cities: city_zip,
    });
  }
});

fs.writeFile("finalShape.json", JSON.stringify(finalShape), (err) => {
  if (err) console.log(err);
});
