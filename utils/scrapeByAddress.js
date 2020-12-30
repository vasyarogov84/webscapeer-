const req = require("request-promise");
const cheerio = require("cheerio");
const stringParseHelper = require("../utils/stringParseHelper");

const scrapeByAddress = async (address) => {
  try {
    const res = await req({
      url: `https://www.zillow.com/homedetails/${address}`,
      rejectUnauthorized: false,
    });

    let $ = cheerio.load(res);

    let addresStats = $(
      'p[class="Text-c11n-8-18-0__aiai24-0 StyledParagraph-c11n-8-18-0__sc-18ze78a-0 pnHPs"]'
    ).text();
    return stringParseHelper(addresStats);
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = scrapeByAddress;
