const fs = require("fs");
const zipCodes = require("./utils/onlyZipcodes.json");

const scrapeByZipCode = require("./utils/scrapeByZipCode");
const scrapeByAddress = require("./utils/scrapeByAddress");

let current = 0;
const all = zipCodes.length;

const interval = setInterval(async () => {
  const availableForSale = await scrapeByZipCode(zipCodes[current]);

  const zipCodeStats = await scrapeByAddress(availableForSale);

  if (zipCodeStats.length) {
    fs.readFile("result.json", (err, data) => {
      const json = JSON.parse(data);
      json.push({
        [zipCodes[current - 1]]: zipCodeStats,
      });
      fs.writeFile("result.json", JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  }
  const stats = fs.statSync("result.json");
  console.log("interval -> stats", stats);

  current = current + 1;
}, 15000);

if (current > all) {
  clearInterval(interval);
}
