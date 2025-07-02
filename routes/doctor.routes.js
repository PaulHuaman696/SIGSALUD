const express = require("express");
const router = express.Router();
const { especialidades, doctoresPorEspecialidad } = require("../data/doctores");

router.get("/especialidades", (req, res) => {
  res.render("especialidades", { especialidades });
});

router.get("/doctores/:especialidad", (req, res) => {
  const especialidad = req.params.especialidad.toLowerCase();
  const doctores = doctoresPorEspecialidad[especialidad] || [];
  res.render("doctores", { especialidad, doctores });
});

router.get("/seleccionar-cita/:doctorId", (req, res) => {
  const doctorId = req.params.doctorId;
  let doctorEncontrado = null;
  for (const lista of Object.values(doctoresPorEspecialidad)) {
    doctorEncontrado = lista.find((d) => d.id === doctorId);
    if (doctorEncontrado) break;
  }
  if (!doctorEncontrado) return res.status(404).send("Doctor no encontrado");

  const hoy = new Date();
  const fechaMinima = hoy.toISOString().split("T")[0];

  res.render("seleccionar-cita", { doctor: doctorEncontrado, fechaMinima });
});

module.exports = router;
