require("dotenv").config();
const req = require("request-promise");
const cheerio = require("cheerio");

const scrapeByZipCode = async (zip) => {
  console.log("scrapeByZipCode -> zip", zip);
  if (!zip) return { stats: "No data" };
  const url = `${process.env.ZILLOW_ZIP_CODE}${zip}_rb/`;
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
      const priceRaw = $(e).find("div[class='list-card-price']").text();
      const is2bathRaw = $(e).find("ul[class='list-card-details']").text();
      const is2 =
        is2bathRaw.split("bds").pop().split(" ").shift().split(",").pop() || "";
      const is2bath = 2 === +is2;
      const price = +priceRaw.split("$").pop().split(",").join("") || 0;
      const priceMatch = price && price > 69000 && price < 125000;
      const houseForSaleText = $(e).find("div[class='list-card-type']").text();
      const house = houseForSaleText === "House for sale";

      if (singleAddress && house && priceMatch && is2bath)
        results.push({ singleAddress, price });
    });
  } catch (error) {
    console.log("error", error);
  }
  console.log("result", results);
  return results;
};

module.exports = scrapeByZipCode;
