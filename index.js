const fs = require("fs");
const zipCodes = require("./utils/onlyZipcodes.json");

const scrapeByZipCode = require("./utils/scrapeByZipCode");
const scrapeByAddress = require("./utils/scrapeByAddress");

let current = 0;
const all = zipCodes.length;

const interval = setInterval(async () => {
  const availableForSale = await scrapeByZipCode(zipCodes[current]);
  const passToScrape = availableForSale.length ? availableForSale.slice(0,2) : [];

  zipCodeStats = passToScrape.length
    ? await scrapeByAddress(passToScrape)
    : null;
 
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
  const stats = fs.statSync("result.json")
  console.log("SIZEEEEEEEE",stats.size);
  console.log("CURRENT ZIP",zipCodes[current - 10])
  current = current + 10;
}, 10000);

if (current > all) {
  clearInterval(interval);
}

// 30sec - 30000
// 60sec - 60000
// 1day - 60000 * 60 * 24
