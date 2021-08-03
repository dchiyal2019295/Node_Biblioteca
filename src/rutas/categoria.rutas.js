'use strict'

var express = require("express");
var categoriaControlador = require("../controladores/categoria.controlador");

var api = express.Router();
api.get('/ejemploCategoria', categoriaControlador.ejemplo);
api.post('/agregarCategoria', categoriaControlador.agregarCategoria);
api.get('/obtenerCategoriasID/:idCategorias', categoriaControlador.obtenerCategoriasID)
api.get('/obtenerCategorias', categoriaControlador.obtenerCategorias);
api.get('/obtenerCategoriaNombre', categoriaControlador.buscarCategoriaNombre)
api.put('/editarCategoria/:id', categoriaControlador.editarCategoria);
api.delete('/eliminarCategoria/:id', categoriaControlador.eliminarCategoria);
api.put('/agregarInformacion/:id', categoriaControlador.agregarInformación);


module.exports = api;
