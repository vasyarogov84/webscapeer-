const fs = require("fs");
const zipCodes = require("./data/Zipcodes.json");

const scrapeByZipCode = require("./utils/scrapeByZipCode");
const scrapeByAddress = require("./utils/scrapeByAddress");

const currentState = zipCodes[2].state;
console.log("currentState", currentState);
const currentStateCities = zipCodes[2].cities;
let current = 0;

const interval = setInterval(async () => {
  const city = currentStateCities[current];
  console.log("interval -> zip_code", city);
  const availableForSale = await scrapeByZipCode(city.zip_code);

  const zipCodeStats = await scrapeByAddress(availableForSale);
  console.log("interval -> zipCodeStats", zipCodeStats);

  if (zipCodeStats.length) {
    fs.readFile("result.json", (err, data) => {
      const json = JSON.parse(data);
      json.push({
        state: currentState,
        city,
        properties: zipCodeStats,
      });
      fs.writeFile("result.json", JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  }
  const stats = fs.statSync("result.json");
  console.log(stats.size);

  current = current + 1;
}, 10000);

if (
  current === currentStateCities.length ||
  current > currentStateCities.length
) {
  clearInterval(interval);
}
