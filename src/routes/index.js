const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuariosController')
const conductoresController = require('../controllers/conductoresController')
const vehiculosController = require('../controllers/vehiculosController')
const viajesController = require('../controllers/viajesController')
const ratingsController = require('../controllers/ratingsController')

module.exports = function () {
    router.get("/",(req, res) => {
        res.send("Hola mundo")
    })
    router.post('/usuarios',usuariosController.nuevoUsuario)

    router.get('/conductores',conductoresController.listarConductores)

    router.get('/vehiculos',vehiculosController.listarVehiculos)
    router.put('vehiculos/:vehiculoId',vehiculosController.actualizarVehiculo)

    router.get('/viajes',viajesController.listarViajes),
    router.get('/viajes/:usuarioId', viajesController.listarViajePorUsuario)
    router.post('/viajes',viajesController.nuevoViaje)

    router.put('/viajes/:idViaje', viajesController.actualizarViaje);

    router.post('/ratings',ratingsController.nuevoRating)

    return router
}
