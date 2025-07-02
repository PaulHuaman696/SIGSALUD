const express = require("express");
const router = express.Router();

router.get("/pasarela-pago", (req, res) => {
  const { fecha, hora, dni, nombre, apellido, edad, paraQuien, motivo } =
    req.query;

  const doctor = {
    nombre: "Dr. Juan Perez",
    especialidad: "Cardiología",
  };

  const monto = 120;

  res.render("pasarela-pago", { doctor, fecha, hora, monto });
});

router.post("/procesar-pago", (req, res) => {
  const { metodo_pago } = req.body;
  res.send("Pago procesado con método: " + metodo_pago);
});

module.exports = router;
