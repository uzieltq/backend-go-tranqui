const Vehiculo = require('../models/Vehicles')

exports.listarVehiculos = async(req,res,next) => {
    try {
        const vehiculos = await Vehiculo.find({estado: 'Disponible'}).populate('conductor')

        res.status(200).json({
            status: 'success',
            message: 'Vehiculos listados exitosamente',
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
