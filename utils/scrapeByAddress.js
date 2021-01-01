const req = require("request-promise");
const cheerio = require("cheerio");
const { pathOr } = require("ramda");
const stringParseHelper = require("../utils/stringParseHelper");

//const testAddresses = require("./addressesTestSet");

const scrapeSingleAddress = async (address) => {
  try {
    const res = await req({
      url: `https://www.zillow.com/homedetails/${address}`,
      rejectUnauthorized: false,
    });

    let $ = cheerio.load(res);
    let rentEstimate = $(
      'div[class="Spacer-c11n-8-18-0__sc-17suqs2-0 kxwsPB"] > span'
    ).text();
    const rent_Zillow_estimate = rentEstimate ? rentEstimate.split("$") : [];
    const rent = rent_Zillow_estimate[2]
      ? rent_Zillow_estimate[2].split("/mo").shift()
      : "";
    const zEst = rent_Zillow_estimate[1] ? rent_Zillow_estimate[1] : "";
    let addresStats = $(
      'p[class="Text-c11n-8-18-0__aiai24-0 StyledParagraph-c11n-8-18-0__sc-18ze78a-0 pnHPs"]'
    ).text();
    const stats = stringParseHelper(addresStats);
    return { ...stats, rent, zEst, address  };
  } catch (error) {
    return { error: error.message };
  }
};

const scrapeByAddress = async (arrOfAddresses) => {
  const filterA = arrOfAddresses.filter((add) => {
    const firstCharacter = add.split("")[0];
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (arr.includes(+firstCharacter)) {
      return add;
    }
  });

  const allResults = await Promise.all(
    filterA.map((adress) => scrapeSingleAddress(adress))
  ).then((data) => data);

  const fResults = allResults.filter((result) => {
    if (pathOr("", ["zEst"], result)) {
      if (
        +result.zEst.split(",").join("") > 35000 &&
        +result.zEst.split(",").join("") < 151000
      ) {
        return result;
      }
    }
  });
  return fResults.length ?  fResults : null;
};

module.exports = scrapeByAddress;
