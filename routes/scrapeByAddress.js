const express = require("express");
const router = express.Router();

router.get("/address/:address/:zipcode", async (req, res) => {
  console.log(req.params);
  res.json({ hey: process.env.ZILLOW_ADDRESS });
});

module.exports = router;
