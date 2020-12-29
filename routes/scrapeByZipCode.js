const express = require("express");
const router = express.Router();
const scrapeByZipCode = require("../utils/scrapeByZipCode");
const scrapeByAddress = require("../utils/scrapeByAddress");

router.get("/zipcode/:zipcode", async (req, res) => {
  const propertiesAvailableForSale = await scrapeByZipCode(req.params.zipcode);
  const zipCodeStats = await scrapeByAddress(propertiesAvailableForSale[0]);
  res.json({ zipCodeStats, propertiesAvailableForSale });
});

module.exports = router;
