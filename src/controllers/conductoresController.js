const Conductores = require('../models/Drivers')

exports.listarConductores = async(req,res,next) => {
    try {
        //Mostrar los datos de los conductores
        const conductores = await Conductores.find({})
        res.json(conductores)
    } catch (error) {
        console.log(error)
        next()
    }
}

