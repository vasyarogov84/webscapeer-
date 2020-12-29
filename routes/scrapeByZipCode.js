const express = require("express");
const router = express.Router();
const scrapeByZipCode = require("../utils/scrapeByZipCode");
const scrapeByAddress = require("../utils/scrapeByAddress");

router.get("/zipcode/:zipcode", async (req, res) => {
  const propertiesAvailableForSale = await scrapeByZipCode(req.params.zipcode);
  const zipCodeState = await scrapeByAddress(propertiesAvailableForSale[0]);
  res.json({ zipCodeState, propertiesAvailableForSale });
});

module.exports = router;
