const express = require("express");
const router = express.Router();
const { pacientes } = require("../data/pacientes");

router.get("/perfildedoctor", (req, res) => {
  res.render("perfildedoctor", { pacientes });
});

router.get("/paciente", (req, res) => {
  res.render("paciente");
});

module.exports = router;
