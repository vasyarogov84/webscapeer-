const express = require("express");
const router = express.Router();
const scrapeByZipCode = require("../utils/scrapeByZipCode");

router.get("/zipcode/:zipcode", async (req, res) => {
  const scrapeResult = await scrapeByZipCode(req.params.zipcode);
  console.log("scrapeResult", scrapeResult);
  res.json({ hey: scrapeResult });
});

module.exports = router;
