const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config({ path: '.env' });

// Crear la conexión a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://GoTranqui:Trabajo1@cluster0.fvylswl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

app.listen(process.env.PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PUERTO}`);
});
