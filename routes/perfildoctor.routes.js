const express = require("express");
const router = express.Router();
const { pacientes } = require("../data/pacientes");
const { getColorByStatus } = require("../helpers/getColorByStatus");

router.get("/perfildedoctor", (req, res) => {
  res.render("perfildedoctor", { pacientes, getColorByStatus });
});

router.get("/paciente/:id_paciente", (req, res) => {
  const paciente = pacientes.find((p) => p.id === req.params.id_paciente);
  if (!paciente) return res.status(404).send("Paciente no encontrado");
  res.render("paciente", { ...paciente, getColorByStatus });
});

router.get("/diagnostico", (req, res) => {
  res.render("diagnostico");
});

module.exports = router;
