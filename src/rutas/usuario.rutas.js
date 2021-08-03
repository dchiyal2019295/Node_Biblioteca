var express = require("express");
var usuarioControlador = require("../controladores/usuario.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
 
api.post('/Registrar', usuarioControlador.agregarUsuario);
api.post('/Login', usuarioControlador.login);
api.put('/EditarUsuario', usuarioControlador.editarUsuario);
api.delete('/EliminarUsuario', usuarioControlador.eliminarUsuario);
api.get('/ObtenerUsuarios', usuarioControlador.obtenerUsuarios);
api.get('/ObtenerUsuarioID/:id', usuarioControlador.obtenerUsuarioId)

module.exports = api