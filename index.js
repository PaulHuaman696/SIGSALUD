const express = require("express");
const app = express();
const path = require("path");

// Mock datos para demo (en producción usa DB)
const especialidades = [
  "cardiologia",
  "medicina-general",
  "neumologia",
  "pediatria",
  "dermatologia",
];

// Datos ejemplo doctores (en producción obtén de DB)
const doctoresPorEspecialidad = {
  cardiologia: [
    {
      id: "doc1",
      nombre: "Dr. Juan Perez",
      descripcion: "Cardiólogo experto",
      calificacion: 5,
      disponibleHoy: true,
      fotoUrl: "/images/doc1.jpg",
    },
    {
      id: "doc2",
      nombre: "Dra. Ana Ruiz",
      descripcion: "Especialista en cardiología",
      calificacion: 4,
      disponibleHoy: false,
      fotoUrl: "/images/doc3.jpg",
    },
  ],
  "medicina-general": [
    {
      id: "doc3",
      nombre: "Dr. Luis Gomez",
      descripcion: "Medicina general",
      calificacion: 4,
      disponibleHoy: true,
      fotoUrl: "/images/doctor3.jpg",
    },
  ],
  // agrega más especialidades...
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Ruta Especialidades
app.get("/especialidades", (req, res) => {
  res.render("especialidades", { especialidades });
});

// Ruta Home (pantalla inicial)
app.get("/", (req, res) => {
  res.render("home");
});

// Ruta login
app.get("/login", (req, res) => {
  res.render("login");
});

// Ruta register
app.get("/register", (req, res) => {
  res.render("register");
});

// Ruta Crear Reserva (formulario)
app.get("/crearReserva", (req, res) => {
  res.render("crearReserva", { formData: {} });
});

app.post("/crearReserva", (req, res) => {
  if (!req.body.dni) {
    res.render("crearReserva", { formData: {} });
    return;
  }
  const { dni, nombres, apellidos, telefono, genero } = req.body;
  res.send(`Reserva creada para ${nombres} ${apellidos}, DNI: ${dni}`);
});

// Doctores por especialidad
app.get("/doctores/:especialidad", (req, res) => {
  const especialidad = req.params.especialidad.toLowerCase();
  const doctores = doctoresPorEspecialidad[especialidad] || [];
  res.render("doctores", { especialidad, doctores });
});

// Seleccionar cita para doctor
app.get("/seleccionar-cita/:doctorId", (req, res) => {
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

// Confirmar cita (POST)
app.post("/confirmar-cita", (req, res) => {
  const { fecha, hora, dni, nombre, apellido, edad, paraQuien, motivo } =
    req.body;

  // Aquí guardarías la cita en BD...

  res.redirect(
    `/pasarela-pago?fecha=${fecha}&hora=${hora}&dni=${dni}&nombre=${nombre}&apellido=${apellido}&edad=${edad}&paraQuien=${paraQuien}&motivo=${encodeURIComponent(
      motivo || "",
    )}`,
  );
});

// Pasarela de pago
app.get("/pasarela-pago", (req, res) => {
  const { fecha, hora, dni, nombre, apellido, edad, paraQuien, motivo } =
    req.query;

  const doctor = {
    nombre: "Dr. Juan Perez",
    especialidad: "Cardiología",
  };
  const monto = 120;

  res.render("pasarela-pago", { doctor, fecha, hora, monto });
});

// Procesar pago (POST)
app.post("/procesar-pago", (req, res) => {
  const { metodo_pago } = req.body;

  // Procesa el pago...

  res.send("Pago procesado con método: " + metodo_pago);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
