const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driversSchema = new Schema({
    nombres: {
        type: String,
        required:true,
        trim: true
    },
    dni: {
        type: String,
        required:true,
        unique:true
    },
    telefono: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
    },
    cantidad_viajes: {
        type: Number
    },
    estado: {
        type: Boolean
    }

});
module.exports = mongoose.model('Conductores',driversSchema)