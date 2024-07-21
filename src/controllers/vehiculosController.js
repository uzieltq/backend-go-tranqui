const Vehiculo = require('../models/Vehicles')

exports.listarVehiculos = async(req,res,next) => {
    try {
        const vehiculos = await Vehiculo.find({})
        res.json(vehiculos)

    } catch (error) {

        console.log(error)
        next()
    }
    
}
exports.actualizarVehiculo = async(req,res,next) => {
    try {
        let vehiculo = await Vehiculo.findOneAndUpdate({_id: req.params.vehiculoId},req.body, {
            new: true,
        }).populate('conductor')
        
        res.json(vehiculo)
        
    } catch (error) {
        console.log(error);
        next();
    }
}