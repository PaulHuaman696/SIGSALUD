const express = require("express");
const router = express.Router();

const token = process.env.API_TOKEN;

router.get("/crearReserva", (req, res) => {
  res.render("crearReserva", { formData: {}, token });
});

router.post("/crearReserva", (req, res) => {
  if (!req.body.dni) {
    res.render("crearReserva", { formData: {}, token });
    return;
  }
  const { dni, nombres, apellidos, telefono, genero } = req.body;
  res.send(`Reserva creada para ${nombres} ${apellidos}, DNI: ${dni}`);
});

router.post("/confirmar-cita", (req, res) => {
  const { fecha, hora, dni, nombre, apellido, edad, paraQuien, motivo } =
    req.body;

  res.redirect(
    `/pasarela-pago?fecha=${fecha}&hora=${hora}&dni=${dni}&nombre=${nombre}&apellido=${apellido}&edad=${edad}&paraQuien=${paraQuien}&motivo=${encodeURIComponent(
      motivo || "",
    )}`,
  );
});

module.exports = router;
