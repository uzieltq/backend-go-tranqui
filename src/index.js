const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config({ path: '.env' });

// Crear la conexión a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});