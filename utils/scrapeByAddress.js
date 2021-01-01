const scrapeSingleAddress = require("../utils/scrapeSingleAddress");
const testAddresses = require("../test/addressesTestSet");

const scrapeByAddress = async (listOfHousesForSale) => {
  const allResults = await Promise.all(
    listOfHousesForSale.map(async (adress) => await scrapeSingleAddress(adress))
  ).then((data) => data);

  return allResults;
};

module.exports = scrapeByAddress;
