const req = require("request-promise");
const cheerio = require("cheerio");

const scrapeByAddress = async (url) => {
  try {
    const res = await req({ url, rejectUnauthorized: false });

    let $ = cheerio.load(res);

    let addresStats = $(
      'p[class="Text-c11n-8-18-0__aiai24-0 StyledParagraph-c11n-8-18-0__sc-18ze78a-0 pnHPs"]'
    ).text();
    console.log("scrapeByAddress -> addresStats", addresStats);
    console.log(typeof addresStats);
    return { stats: addresStats, status: "success" };
  } catch (error) {
    return { stats: null, status: "fail" };
  }
};

module.exports = scrapeByAddress;
