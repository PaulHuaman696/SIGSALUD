const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({
    pacienteId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true 
    },
    fechaHora: { 
        type: Date, 
        required: [true, 'La fecha y hora de la cita son obligatorias.']
    },
    motivo: { 
        type: String, 
        required: [true, 'El motivo de la consulta es obligatorio.'], 
        trim: true 
    },
    estado: {
        type: String,
        required: true,
        enum: ['programada', 'confirmada', 'completada', 'cancelada'],
        default: 'programada'
    },
    // Sub-documento para el historial. Se llena cuando la cita se marca como 'completada'.
    historialConsulta: {
        diagnostico: { type: String, trim: true },
        notasDoctor: { type: String, trim: true },
        tratamiento: { type: String, trim: true },
        archivosAdjuntos: [{
            nombreArchivo: String,
            url: String
        }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Cita", CitaSchema);