const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/doctorsearch", (req, res) => {
  res.render("doctorsearch");
});

router.get("/doctorsearch/:doctorId", (req, res) => {
  const doctorId = req.params.doctorId;
});

module.exports = router;
