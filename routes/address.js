const express = require("express");
const router = express.Router();
const scrapeByAddress = require("../utils/scrapeByAddress");

const url =
  "https://www.zillow.com/homedetails/3816-Colton-Ln-NE-Huntsville-AL-35811/92116615_zpid/";

/* GET home page. */
router.get("/", async (req, res, next) => {
  const result = await scrapeByAddress(url);
  res.json(result);
});

module.exports = router;
