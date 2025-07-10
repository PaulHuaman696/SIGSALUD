const express = require("express");
const router = express.Router();

router.get("/perfildedoctor", (req, res) => {
  res.render("perfildedoctor");
});

router.get("/paciente", (req, res) => {
  res.render("paciente");
});

module.exports = router;
