const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config({path:'.env'})


//Crear la conexión a mongodb
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/gotranqui', {

})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',routes())

app.listen(process.env.PUERTO)

