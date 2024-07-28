const Usuarios = require('../models/Users')

exports.nuevoUsuario = async(req,res,next) => {
    const usuario = new Usuarios(req.body);

    try {
        await usuario.save()
        res.status(200).json({
            status:'success',
            message: 'Se añadió un nuevo usuario',
            data: usuario.id
        });
        
        
    } catch (error) {
        res.send(error);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error en el registro de usuario',
            error: error.message
        });
        next();
    }
}