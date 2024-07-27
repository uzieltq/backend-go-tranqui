const Vehiculo = require('../models/Vehicles')

exports.listarVehiculos = async(req,res,next) => {
    try {
        const vehiculos = await Vehiculo.find({}).populate('conductor')

        res.status(200).json({
            status: 'success',
            message: 'Conductores listados exitosamente',
            data: vehiculos
        });


     
    } catch (error) {

        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al listar los conductores',
            error: error.message
        });
        next();
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