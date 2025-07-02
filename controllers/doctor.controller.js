const Doctor = require('../models/doctor.js');

// @desc    Obtener todos los doctores con su información de usuario
// @route   GET /api/doctores
exports.obtenerDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.find().populate('usuarioId', 'nombreCompleto email telefono');
        res.json(doctores);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// @desc    Obtener un doctor específico por su ID
// @route   GET /api/doctores/:id
exports.obtenerDoctorPorId = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('usuarioId', 'nombreCompleto email telefono');
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor no encontrado.' });
        }
        res.json(doctor);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// @desc    (EXTRA) Buscar doctores por especialidad
// @route   GET /api/doctores/buscar/especialidad?q=Cardiologia
exports.buscarDoctoresPorEspecialidad = async (req, res) => {
    try {
        const especialidadQuery = req.query.q;
        if (!especialidadQuery) {
            return res.status(400).json({ msg: 'Por favor, proporciona una especialidad para buscar.' });
        }

        const doctores = await Doctor.find({ 
            especialidad: new RegExp(especialidadQuery, 'i') // Búsqueda insensible a mayúsculas/minúsculas
        }).populate('usuarioId', 'nombreCompleto email');
        
        res.json(doctores);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};