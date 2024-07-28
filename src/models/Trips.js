const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const ubicacionSchema = new Schema({
//     type: {
//         type: String,
//         enum: ['Point'],
//         required: true
//       },
//       coordinates: {
//         type: [Number],
//         required: true
//       }
// })

const tripsSchema = new Schema({
  fecha : {
    type: Date,
    default: Date.now,
  },
   usuario: {
    type: Schema.ObjectId,
    ref:'Usuarios'
   },
   vehiculo: {
     type: Schema.ObjectId,
     ref:'Vehiculos'
   },
   origen: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  destino: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
   pago: {
    type:String,
    required:true
   },
   precio:{
    type: Number,
    required: true
   },
   estado: {
    type:String,
   }

});
module.exports = mongoose.model('Viajes',tripsSchema)