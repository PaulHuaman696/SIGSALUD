const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombreCompleto: { 
        type: String, 
        required: [true, 'El nombre completo es obligatorio.'], 
        trim: true 
    },
    dni: { 
        type: String, 
        required: [true, 'El DNI es obligatorio.'], 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio.'], 
        unique: true, 
        trim: true,
        lowercase: true // Guarda el email en minúsculas para consistencia
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria.'] 
        // Recuerda: La encriptación con bcrypt se hace antes de guardar, no en el schema.
    },
    fechaNacimiento: { 
        type: Date 
    },
    telefono: { 
        type: String, 
        trim: true 
    },
    rol: {
        type: String,
        required: true,
        enum: {
            values: ['paciente', 'doctor', 'administrador'],
            message: '{VALUE} no es un rol válido.'
        }
    }
}, {
    // Esto añade automáticamente los campos createdAt y updatedAt
    timestamps: true
});

module.exports = mongoose.model("Usuario", UsuarioSchema);