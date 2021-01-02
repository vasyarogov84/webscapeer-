const { pathOr } = require("ramda");
const req = require("request-promise");
const cheerio = require("cheerio");
const stringParseHelper = require("./stringParseHelper");

const scrapeSingleAddress = async ({ singleAddress, price }) => {
  console.log("scrapeSingleAddress -> url", singleAddress);
  try {
    const res = await req({
      url: singleAddress,
      rejectUnauthorized: false,
    });

    let $ = cheerio.load(res);
    let rentEstimateRaw = $(
      'div[class="Spacer-c11n-8-18-0__sc-17suqs2-0 kxwsPB"] > span'
    ).text();
    const rentEstimate = rentEstimateRaw ? rentEstimateRaw.split("$") : [];
    const rent = +pathOr("", [2], rentEstimate)
      .split("/mo")
      .shift()
      .split(",")
      .join("");
    const zEst = +pathOr("", [1], rentEstimate).split(",").join("");
    let addresStats = $(
      'p[class="Text-c11n-8-18-0__aiai24-0 StyledParagraph-c11n-8-18-0__sc-18ze78a-0 pnHPs"]'
    ).text();
    const stats = stringParseHelper(addresStats);
    return { ...stats, rent, zEst, url: singleAddress, price };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = scrapeSingleAddress;
