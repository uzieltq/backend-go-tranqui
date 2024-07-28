const Usuarios = require('../models/Users')

exports.nuevoUsuario = async(req,res,next) => {
    const usuario = new Usuarios(req.body);

    try {
        await usuario.save()
        res.json({mensaje:'Se agregó un nuevo usuario'});
        
    } catch (error) {
        res.send(error);
        next();
    }
}