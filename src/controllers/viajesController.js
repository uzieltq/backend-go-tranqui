const Viaje = require('../models/Trips')
const Usuarios = require('../models/Users')
const Vehiculos = require('../models/Vehicles')

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

exports.listarViajePorUsuario = async (req, res, next) => {
    try {
        const uid = req.params.usuarioId; // Obtener el uid de Firebase desde los parámetros de la solicitud
        if (!uid) {
            return res.status(400).json({
                status: 'error',
                message: 'El UID del usuario es necesario'
            });
        }

        // Buscar el usuario en la colección de usuarios utilizando el uid de Firebase
        const usuario = await Usuarios.findOne({ uid });
        if (!usuario) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        // Buscar los viajes del usuario utilizando el ObjectId de MongoDB del usuario
        const viajesUsuario = await Viaje.find({ usuario: usuario._id }).populate('usuario').populate('vehiculo');

        res.status(200).json({
            status: 'success',
            message: 'Viajes listados correctamente',
            data: viajesUsuario
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
};


exports.nuevoViaje = async (req, res, next) => {
    const { uid, vehiculo, origen, destino, pago, precio, estado, fecha } = req.body;

    try {
        // Buscar el usuario por uid de Firebase
        const usuario = await Usuarios.findOne({ uid });

        if (!usuario) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado con el UID proporcionado'
            });
        }

        // Buscar el vehículo por ID
        const vehiculoEncontrado = await Vehiculos.findById(vehiculo);

        if (!vehiculoEncontrado) {
            return res.status(404).json({
                status: 'error',
                message: 'Vehículo no encontrado'
            });
        }

        vehiculoEncontrado.estado = 'En ruta'; 
        await vehiculoEncontrado.save();

        // Crear un nuevo viaje con el id del usuario de MongoDB
        const viaje = new Viaje({
            usuario: usuario._id,
            vehiculo,
            origen,
            destino,
            pago,
            precio,
            estado,
            fecha: fecha || Date.now() // Usar la fecha proporcionada o la fecha actual si no se proporciona
        });

        await viaje.save();
        res.status(200).json({
            status: 'success',
            message: 'Viaje correctamente agregado a la lista',
            data: viaje._id // Incluir el id del viaje en la respuesta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar el viaje',
            error: error.message
        });
        next();
    }
};


exports.actualizarViaje = async (req, res, next) => {
    const { idViaje } = req.params;
    const { estado } = req.body;

    try {
        // Actualizar el estado del viaje
        let viaje = await Viaje.findOneAndUpdate(
            { _id: idViaje },
            { estado: estado }, 
            { new: true }
        ).populate('usuario')
        .populate('vehiculo');

        if (!viaje) {
            return res.status(404).json({
                status: 'error',
                message: 'Viaje no encontrado'
            });
        }


        if (viaje.vehiculo) {
            await Vehiculos.findByIdAndUpdate(
                viaje.vehiculo._id,
                { estado: 'Disponible' } 
            );
        }

        if ((estado === 'Finalizado' || estado === 'Cancelado')  && viaje.vehiculo) {
            await Vehiculos.findByIdAndUpdate(
                viaje.vehiculo._id,
                { estado: 'Disponible' } 
            );
        }

        res.status(200).json({
            status: 'success',
            message: 'Operación exitosa!!',
            data: viaje._id
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
};
