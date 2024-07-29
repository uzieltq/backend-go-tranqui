const mongoose = require('mongoose')
const Schema = mongoose.Schema


const RatingsSchema = new Schema({

   usuario: {
    type: Schema.ObjectId,
    ref:'Usuarios'
   },
   conductor: {
     type: Schema.ObjectId,
     ref:'Conductores'
   },
   rating: {
    type: Number,
   },
   comentario: {
    type:String,
    trim: true,
   },

   fecha : {
    type: Date,
    default: Date.now,
  },

});
module.exports = mongoose.model('Ratings',RatingsSchema)