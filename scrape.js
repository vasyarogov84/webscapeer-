const fs = require("fs");
const zipCodes = require("./data/Zipcodes.json");

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
      console.log("TEST", zipCodes[current]);
      json.push({
        zip_code: JSON.stringify(zipCodes[current]),
        properties: zipCodeStats,
      });
      fs.writeFile("result.json", JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  }
  const stats = fs.statSync("result.json");
  console.log("-> stats", stats.size);
  console.log("-> current", zipCodes[current - 1]);

  current = current + 1;
}, 15000);

if (current > all) {
  clearInterval(interval);
}
