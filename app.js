'use strict'

//variables globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')

//importacion de rutas
var busqueda_rutas = require("./src/rutas/busqueda.rutas");
var categoria_rutas = require("./src/rutas/categoria.rutas");
var usuario_rutas = require("./src/rutas/usuario.rutas");
var informacion_rutas = require("./src/rutas/informacion.rutas");
var images_rutas = require("./src/rutas/imagenes.rutas")




// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cabezeras
app.use(cors());



//aplicacion de rutas
app.use('/api', busqueda_rutas,categoria_rutas,usuario_rutas,informacion_rutas,images_rutas);


//exportar
module.exports = app;