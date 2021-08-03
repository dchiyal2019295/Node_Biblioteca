'use strict'

var express = require("express");
var busquedaControlador = require("../controladores/busqueda.controlador");

var api = express.Router();
api.get('/ejemplo', busquedaControlador.ejemplo);
api.get('/obtenerCategorias', busquedaControlador.obtenerCategorias);
api.get('/obtenerCategoriasID:/idCategorias', busquedaControlador.obtenerCategoriasID);
api.get('/obtenerCategoriaNombre', busquedaControlador.buscarCategoriaNombre)


module.exports = api;