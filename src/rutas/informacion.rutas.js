'use strict'

var express = require('express');
var infoControlador = require('../controladores/informacion.controlador');

// MIDDLEWARES === INTERMEDIARIO
var md_autorizacion = require('../middlewares/authenticated');
var multiparty = require('connect-multiparty');
var md_subirImagen = multiparty({ uploadDir: './src/imagenes/informacion' });
// RUTAS
var app = express.Router();
app.post('/agregarinformacion',  infoControlador.agregarInformacion);
app.post('/subirImagen', [  md_subirImagen ], infoControlador.subirImagenInfo);

module.exports = app;