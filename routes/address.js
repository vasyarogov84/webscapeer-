const express = require("express");
const router = express.Router();
const scrapeByAddress = require("../utils/scrapeByAddress");

const url =
  "https://www.zillow.com/homedetails/123-Dormont-Dr-NE-Huntsville-AL-35810/109521302_zpid/";

/* GET home page. */
router.get("/", async (req, res, next) => {
  const result = await scrapeByAddress(url);
  res.json(result);
});

module.exports = router;
