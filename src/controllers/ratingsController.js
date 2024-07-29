const Ratings = require('../models/Ratings');
const Viajes = require('../models/Trips'); 
const Vehiculos = require('../models/Vehicles'); 
const Conductores = require('../models/Drivers'); 

exports.nuevoRating = async (req, res, next) => {
    const { idTrip, rating, comentario } = req.body;

    try {

        // Buscar el viaje por idTrip
        const viaje = await Viajes.findById(idTrip);

        if (!viaje) {
            return res.status(404).json({
                status: 'error',
                message: 'Viaje no encontrado con el ID proporcionado'
            });
        }

        // Obtener el ID del vehículo y usuario
        const usuarioId = viaje.usuario;
        const vehiculoId = viaje.vehiculo;

        // Buscar el vehículo por su ID
        const vehiculo = await Vehiculos.findById(vehiculoId);

        if (!vehiculo) {
            return res.status(404).json({
                status: 'error',
                message: 'Vehículo no encontrado con el ID proporcionado'
            });
        }

        // Obtener el ID del conductor desde el vehículo
        const conductorId = vehiculo.conductor;

        // Buscar el conductor por su ID
        const conductor = await Conductores.findById(conductorId);

        if (!conductor) {
            return res.status(404).json({
                status: 'error',
                message: 'Conductor no encontrado con el ID proporcionado'
            });
        }

        // Crear el nuevo rating
        const nuevoRating = new Ratings({
            usuario: usuarioId,
            conductor: conductor._id,
            rating,
            comentario,
        });

        await nuevoRating.save();

        // Calcular el nuevo rating del conductor
        const ratings = await Ratings.find({ conductor: conductor._id });
        const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
        const cantidadDeViajes = ratings.length;
        const nuevoPromedioRating = totalRatings / cantidadDeViajes;

        // Actualizar el rating y cantidad de viajes del conductor
        conductor.rating = nuevoPromedioRating;
        conductor.cantidad_viajes = cantidadDeViajes;
        await conductor.save();

        res.status(200).json({
            status: 'success',
            message: 'Se añadió una nueva calificación',
            data: nuevoRating
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error en el registro de usuario',
            error: error.message
        });
        next();
    }
};
