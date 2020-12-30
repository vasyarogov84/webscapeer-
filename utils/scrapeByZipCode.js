const req = require("request-promise");
const cheerio = require("cheerio");

const scrapeByZipCode = async (zip) => {
  if (!zip) return { stats: "No data" };
  const url = `https://www.zillow.com/homes/${zip}_rb/`;
  const results = [];
  try {
    const res = await req({ url, rejectUnauthorized: false });

    const $ = cheerio.load(res);
    const allForSale = $(
      'ul[class="photo-cards photo-cards_wow photo-cards_short"] > li'
    );
    allForSale.each(function (i, e) {
      const singleAddress = $(e)
        .find(
          'a[class="list-card-link list-card-link-top-margin list-card-img"]'
        )
        .attr("href");
      if (singleAddress)
        results.push(
          singleAddress.split("https://www.zillow.com/homedetails/").pop()
        );
    });
  } catch (error) {
    console.log("error", error);
  }
  return results;
};

module.exports = scrapeByZipCode;
