const scrapeSingleAddress = require("../utils/scrapeSingleAddress");
const { isEmpty } = require("ramda");

const scrapeByAddress = async (listOfHousesForSale) => {
  const allResults = await Promise.all(
    listOfHousesForSale.map(async (adress) => await scrapeSingleAddress(adress))
  ).then((data) => data);

  const filterResults = allResults.filter((el) => !isEmpty(el));
  return filterResults;
};

module.exports = scrapeByAddress;
