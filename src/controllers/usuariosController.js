const Usuarios = require('../models/Users');

exports.nuevoUsuario = async (req, res, next) => {
    const { uid, nombres, email } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos por uid
        const usuarioExistente = await Usuarios.findOne({ uid });

        if (usuarioExistente) {
            return res.status(200).json({
                status: 'success',
                message: 'El usuario ya está registrado con ese UID',
                data: usuarioExistente._id 
            });
        }

        // Si el usuario no existe, proceder a crear uno nuevo
        const usuario = new Usuarios({ uid, nombres, email });
        await usuario.save();

        res.status(200).json({
            status: 'success',
            message: 'Se añadió un nuevo usuario',
            data: usuario._id 
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error en el registro de usuario',
            error: error.message
        });
        next();
    }
};
