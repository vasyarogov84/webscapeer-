const req = require("request-promise");
const cheerio = require("cheerio");

const scrapeByZipCode = async (zip) => {
  const url = `https://www.zillow.com/homes/${zip}_rb/`;
  try {
    const res = await req({ url, rejectUnauthorized: false });

    let $ = cheerio.load(res);

    const test = $(
      'ul[class="photo-cards photo-cards_wow photo-cards_short"] > li'
    ).each(function (i, e) {
      console.log(
        i,
        $(e)
          .find(
            'a[class="list-card-link list-card-link-top-margin list-card-img"]'
          )
          .attr("href")
      );
    });
  } catch (error) {
    console.log("error", error);
  }
};
