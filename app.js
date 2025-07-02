const express = require("express");
const path = require("path");
const conectDB = require("./config/db");
const app = express();

conectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "helpers")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes/home.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/doctor.routes"));
app.use("/", require("./routes/reserva.routes"));
app.use("/", require("./routes/pago.routes"));

module.exports = app;
