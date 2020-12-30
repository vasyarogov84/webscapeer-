const fs = require("fs");

const zipCodes = require("./utils/onlyZipcodes.json");
const scrapeByZipCode = require("./utils/scrapeByZipCode");
const scrapeByAddress = require("./utils/scrapeByAddress");
let current = 0;

const interval = setInterval(async () => {
  let availableForSale;
  let zipCodeStats;
  availableForSale = await scrapeByZipCode(zipCodes[current]);

  zipCodeStats = await scrapeByAddress(
    availableForSale[Math.floor(Math.random() * availableForSale.length)]
  );
  console.log("interval -> zipCodeStats", zipCodeStats);

  if (zipCodeStats) {
    fs.readFile("result.json", (err, data) => {
      var json = JSON.parse(data);
      json.push({
        [zipCodes[current - 1]]: zipCodeStats,
      });
      fs.writeFile("result.json", JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  }

  current++;
}, 6000);

if (current > zipCodes.length) {
  clearInterval(interval);
}

// 30sec - 30000
// 60sec - 60000
// 1day - 60000 * 60 * 24
