const req = require("request-promise");
const cheerio = require("cheerio");

const scrapeByZipCode = async (zip) => {
  const url = `https://www.zillow.com/homes/${zip}_rb/`;
  const result = [];
  try {
    const res = await req({ url, rejectUnauthorized: false });

    const $ = cheerio.load(res);

    $('ul[class="photo-cards photo-cards_wow photo-cards_short"] > li').each(
      function (i, e) {
        const singleAddress = $(e)
          .find(
            'a[class="list-card-link list-card-link-top-margin list-card-img"]'
          )
          .attr("href");
        if (singleAddress) result.push(singleAddress);
      }
    );
  } catch (error) {
    console.log("error", error);
  }
  return result;
};

module.exports = scrapeByZipCode;
