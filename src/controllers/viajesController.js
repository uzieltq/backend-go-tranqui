const Viaje = require('../models/Trips')

exports.listarViajes = async(req,res,next) => {
    try {
        const viajes = await Viaje.find({}).populate('usuario').populate('vehiculo')
        res.status(200).json({
            status:'success',
            message:'Viajes listados correctamente',
            data: viajes
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'No se encontraron registros de los viajes',
            error: error.message
        });
        next();
    }
}

exports.listarViajePorUsuario = async(req,res,next) => {
    try {
      const usuario = req.params.usuarioId;
      if (!usuario) {
            return res.status(500).json({
                status: 'error',
                message: 'No existe el usuario'
        });
      }
      const viajesUsuario = await Viaje.find({usuario: usuario}).populate('usuario').populate('vehiculo');
      res.status(200).json({
        status:'success',
        message:'Viajes listados correctamente',
        data:viajesUsuario
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'No se encontraron viajes del usuario',
            error: error.message
        });
        next();
    }
}

exports.nuevoViaje = async(req,res,next) => {
    const viaje = new Viaje(req.body)
    try {
        await viaje.save();
        res.json({mensaje: 'Viaje correctamente agregado a la lista'})
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.actualizarViaje = async(req,res,next) => {
    try {
        let viaje = await Viaje.findOneAndUpdate({_id: req.params.idViaje}, req.body, {
            new: true,
        }).populate('usuario')
        .populate('vehiculo');
        res.status(200).json({
            status:'success',
            message: 'Se actualizó el estado del viaje'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al actualizar el viaje',
            error: error.message
        });
        next();
    }
}