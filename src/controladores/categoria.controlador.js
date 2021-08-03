'use strict'

var Categoria = require("../modelos/categoria.model");

function ejemplo(req, res){
    return res.status(200).send({mensaje:'Controlador de Categoria funcionando'});
}

function agregarCategoria(req, res){
    var categoriasModel = new Categoria();
    var params = req.body;

    if(params.nombre){
        categoriasModel.nombre = params.nombre;

        categoriasModel.save((err, categoriaGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion de la categoria'});
            if(!categoriaGuardada) return res.status(500).send({mensaje:'Error al agregar la categoria'});

            return res.status(200).send({categoriaGuardada});
        })
    }
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

function editarCategoria(req, res){
    var params = req.body;
    var idCategoria = req.params.id;

    Categoria.findByIdAndUpdate(idCategoria, params, {new: true}, (err, categoriaActualizada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de editar la categoria'});
        if(!categoriaActualizada) return res.status(500).send({mensaje: 'Error al editar la categoria'});

        return res.status(200).send({categoriaActualizada});
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

function eliminarCategoria(req, res){
    var idCategoria = req.params.id;

    Categoria.findByIdAndDelete(idCategoria, (err, categoriaEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if(!categoriaEliminada) return res.status(500).send({mensaje: 'No de a podido eliminar la categoria'});

        return res.status(200).send({categoriaEliminada});
    })
}

function agregarInformación(req, res){
    var params = req.body;
    var idCategoria = req.params.id;

    Categoria.findByIdAndUpdate(idCategoria, {$push: {informacion: { descripcion: params.descripcion}}},
        {new: true}, (err, informacionAgregada)=>{
            return res.status(200).send({informacionAgregada: informacionAgregada});
        })
}

module.exports = {
    ejemplo,
    agregarCategoria,
    obtenerCategoriasID,
    obtenerCategorias,
    editarCategoria,
    eliminarCategoria,
    agregarInformación, 
    buscarCategoriaNombre
}