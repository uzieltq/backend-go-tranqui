const Viaje = require('../models/Trips')

exports.listarViajes = async(req,res,next) => {
    try {
        const viajes = await Viaje.find({}).populate('usuario').populate('vehiculo')
        res.json(viajes)
    } catch(error){
        console.log(error);
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
        res.json(viaje)
    } catch (error) {
        console.log(error);
        next();
    }
}