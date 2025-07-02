const Usuario = require('../models/usuario.js');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens de sesión

// @desc    Registrar un nuevo usuario
// @route   POST /api/usuarios/registro
exports.registrarUsuario = async (req, res) => {
    const { nombreCompleto, dni, email, password, rol, fechaNacimiento, telefono } = req.body;

    try {
        // 1. Verificar si el usuario ya existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'El correo electrónico ya está registrado.' });
        }

        // 2. Crear el nuevo usuario
        usuario = new Usuario({
            nombreCompleto,
            dni,
            email,
            password,
            rol: rol || 'paciente', // Rol por defecto es 'paciente'
            fechaNacimiento,
            telefono
        });

        // 3. Encriptar la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        // 4. Guardar en la BD
        await usuario.save();
        
        // 5. Opcional: Devolver un token para auto-login
        res.status(201).json({ msg: 'Usuario registrado exitosamente.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// @desc    Iniciar sesión
// @route   POST /api/usuarios/login
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        // 2. Comparar la contraseña ingresada con la de la BD
        const esCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esCorrecta) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        // 3. Crear y firmar el JSON Web Token (JWT)
        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Debes tener una variable de entorno JWT_SECRET
            { expiresIn: '8h' }, // El token expira en 8 horas
            (error, token) => {
                if (error) throw error;
                res.json({ token }); // Devolvemos el token al cliente
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};