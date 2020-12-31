const fs = require("fs");
const zipCodes = require("./utils/onlyZipcodes.json");

const scrapeByZipCode = require("./utils/scrapeByZipCode");
const scrapeByAddress = require("./utils/scrapeByAddress");

let current = 0;
const all = zipCodes.length;

const interval = setInterval(async () => {
  const availableForSale = await scrapeByZipCode(zipCodes[current]);
  console.log("interval -> availableForSale", availableForSale);

  zipCodeStats = availableForSale.length
    ? await scrapeByAddress(availableForSale)
    : null;
  // console.log("zipCodeStats", zipCodeStats);
  // console.log("current", current);

  if (zipCodeStats) {
    fs.readFile("result.json", (err, data) => {
      var json = JSON.parse(data);
      json.push({
        [zipCodes[current - 10]]: zipCodeStats,
      });
      fs.writeFile("result.json", JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  }

  current = current + 10;
}, 6000);

if (current > all) {
  clearInterval(interval);
}

// 30sec - 30000
// 60sec - 60000
// 1day - 60000 * 60 * 24
