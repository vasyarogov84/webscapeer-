const express = require("express");
const router = express.Router();

// const url =
//   "https://www.zillow.com/homedetails/3816-Colton-Ln-NE-Huntsville-AL-35811/92116615_zpid/";

/* GET home page. */
router.get("/scrape", async (req, res) => {
  // const result = await scrapeByAddress(url);
  res.json({ hey: "This is wellcome page to you!" });
});

module.exports = router;
