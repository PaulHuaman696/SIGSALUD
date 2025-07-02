const Cita = require('../models/cita.js');

// @desc    Crear una nueva cita
// @route   POST /api/citas
exports.crearCita = async (req, res) => {
    // pacienteId se obtendría del token del usuario logueado
    const { doctorId, fechaHora, motivo } = req.body;
    const pacienteId = req.usuario.id; // Suponiendo que tienes un middleware de autenticación

    try {
        const nuevaCita = new Cita({
            pacienteId,
            doctorId,
            fechaHora,
            motivo
        });

        const cita = await nuevaCita.save();
        res.status(201).json(cita);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// @desc    Obtener citas de un paciente específico
// @route   GET /api/citas/paciente/:id
exports.obtenerCitasPorPaciente = async (req, res) => {
    try {
        const citas = await Cita.find({ pacienteId: req.params.id })
            .populate({
                path: 'doctorId',
                select: 'especialidad',
                populate: {
                    path: 'usuarioId',
                    select: 'nombreCompleto'
                }
            })
            .sort({ fechaHora: -1 }); // Ordenar por fecha descendente
        res.json(citas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// @desc    (EXTRA) Actualizar estado de una cita (confirmar/cancelar)
// @route   PATCH /api/citas/:id/estado
exports.actualizarEstadoCita = async (req, res) => {
    const { estado } = req.body; // El nuevo estado: 'confirmada' o 'cancelada'
    try {
        const cita = await Cita.findByIdAndUpdate(
            req.params.id, 
            { estado }, 
            { new: true }
        );
        if (!cita) {
            return res.status(404).json({ msg: 'Cita no encontrada.' });
        }
        res.json({ msg: `Cita ${estado} exitosamente`, cita });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// @desc    (EXTRA) Agregar historial a una cita completada
// @route   POST /api/citas/:id/historial
exports.agregarHistorialConsulta = async (req, res) => {
    const { diagnostico, notasDoctor, tratamiento } = req.body;
    try {
        const cita = await Cita.findById(req.params.id);
        if (!cita) {
            return res.status(404).json({ msg: 'Cita no encontrada.' });
        }
        
        cita.historialConsulta = { diagnostico, notasDoctor, tratamiento };
        cita.estado = 'completada'; // Al agregar historial, se marca como completada

        await cita.save();
        res.json(cita);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};