const Conductores = require('../models/Drivers')

// exports.listarConductores = async(req,res,next) => {
//     try {
//         //Mostrar los datos de los conductores
//         const conductores = await Conductores.find({})
//         res.json(conductores)
//     } catch (error) {
//         console.log(error)
//         next()
//     }
// }

exports.listarConductores = async (req, res, next) => {
    try {
        // Mostrar los datos de los conductores
        const conductores = await Conductores.find({});
        
        res.status(200).json({
            status: 'success',
            message: 'Conductores listados exitosamente',
            data: conductores
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
};


