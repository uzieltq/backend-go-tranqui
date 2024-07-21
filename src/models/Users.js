const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    nombres: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    }
});
module.exports = mongoose.model('Usuarios',usersSchema)