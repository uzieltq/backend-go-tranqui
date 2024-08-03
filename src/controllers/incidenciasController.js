const Incidents = require('../models/Incidents');
const Viajes = require('../models/Trips'); 
const Usuarios = require('../models/Users'); 

exports.nuevaIncidencia = async (req, res, next) => {
    const { uid, idViaje, imagenes, comentario } = req.body;

    try {
        // Validar que los datos estén presentes
        if (!idViaje || !comentario) {
            return res.status(400).json({
                status: 'error',
                message: 'El ID del viaje y el comentario son necesarios'
            });
        }

        // Buscar el viaje por idViaje
        const viaje = await Viajes.findById(idViaje);

        if (!viaje) {
            return res.status(404).json({
                status: 'error',
                message: 'Viaje no encontrado con el ID proporcionado'
            });
        }


        // Buscar el usuario por uid de Firebase
        const usuario = await Usuarios.findOne({ uid });

        if (!usuario) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado con el UID proporcionado'
            });
        }


        // Crear el nuevo reporte
        const nuevoReporte = new Incidents({
            viaje: viaje._id,
            usuario: usuario._id,
            imagenes,
            comentario
        });

        await nuevoReporte.save();

        res.status(200).json({
            status: 'success',
            message: 'Incidencia registrada exitosamente',
            data: nuevoReporte._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al registrar la incidencia',
            error: error.message
        });
        next();
    }
};
