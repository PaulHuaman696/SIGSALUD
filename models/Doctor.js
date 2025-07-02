const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', // Crea la referencia al modelo Usuario
        required: true 
    },
    especialidad: { 
        type: String, 
        required: [true, 'La especialidad es obligatoria.'], 
        trim: true 
    },
    cmp: { 
        type: String, 
        required: [true, 'El código CMP es obligatorio.'], 
        unique: true, 
        trim: true 
    },
    horariosDisponibles: [{ // Un arreglo de sub-documentos para los horarios
        dia: {
            type: String,
            required: true,
            enum: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado', 'domingo']
        },
        horaInicio: { type: String, required: true }, // Formato '09:00'
        horaFin: { type: String, required: true }     // Formato '13:00'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Doctor", DoctorSchema);