const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncidentSchema = new Schema({
    viaje: {
        type: Schema.Types.ObjectId,
        ref: 'Viajes',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    imagenes: [String], 
    comentario: {
        type: String,
        trim: true,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Incidents', IncidentSchema);
