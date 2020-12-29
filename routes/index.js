const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  res.json({ hey: "This is home page! Cheers!" });
});

module.exports = router;
