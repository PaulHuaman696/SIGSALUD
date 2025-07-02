const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/doctorsearch", (req, res) => {
  res.render("doctorsearch");
});

module.exports = router;
