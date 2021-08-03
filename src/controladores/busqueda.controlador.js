'use strict'

var Busqueda = require("../modelos/busqueda.model");
var Categoria = require("../modelos/categoria.model");

function ejemplo(req, res){
    return res.status(200).send({mensaje:'Controlador de busqueda funcionando'});
}

function obtenerCategoriasID(req, res){
    var categoriasId = req.params.idCategorias;
    
    Categoria.findById(categoriasId, (err, categoriaEncontrada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición de la Categoria'});
        if(!categoriaEncontrada) return res.status(500).send({mensaje: 'Error al obtener la categoria'});
        
        return res.status(200).send({categoriaEncontrada});
    })
}

function obtenerCategorias(req, res){

    Categoria.find().exec((err, categorias)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de obtener las categorias'});
        if(!categorias) return res.status(500).send({mensaje: 'No existen categorias para mostrar'});

        return res.status(200).send({categorias});
    })
}

function buscarCategoriaNombre(req, res){
    var categoriaNombre = req.body;


    Categoria.findOne(categoriaNombre,(err, categoriaEncontrada)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!categoriaEncontrada) return res.status(500).send({mensaje: 'Error al buscar la categoria'});

        return res.status(200).send({categoriaEncontrada});
    })
}

module.exports = {
    ejemplo,
    obtenerCategoriasID,
    obtenerCategorias,
    buscarCategoriaNombre
}