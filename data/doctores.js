const especialidades = [
  "cardiologia",
  "medicina-general",
  "neumologia",
  "pediatria",
  "dermatologia",
];

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
      fotoUrl: "images/doctor3.jpg",
    },
  ],
};

module.exports = { especialidades, doctoresPorEspecialidad };
