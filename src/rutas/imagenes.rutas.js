'use strict'

var express = require('express');
var imgControlador = require('../controladores/imagenes.controlador');

// MIDDLEWARES === INTERMEDIARIO
var md_autorizacion = require('../middlewares/authenticated');
var multiparty = require('connect-multiparty');
var md_subirImagen = multiparty({ uploadDir: './src/imagenes/informacion' });
// RUTAS
var app = express.Router();
app.post('/agregarimagen',  imgControlador.agregarImg);
app.post('/subirImagenImg', [  md_subirImagen ], imgControlador.subirImagenImg);

module.exports = app;