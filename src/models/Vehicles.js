const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    placa: {
        type: String,
        trim:true,
        required:true,
        unique:true
    },
    marca: {
        type:String,
        required:true,
        trim:true
    },
    modelo: {
        type:String,
        required:true,
        trim:true
    },
    capacidad: {
        type:Number,
        required:true
    },
    conductor: {
        type:Schema.ObjectId,
        ref: 'Conductores'
    },
    estado: {
        type:String
    }
});
module.exports = mongoose.model('Vehiculos',vehicleSchema)