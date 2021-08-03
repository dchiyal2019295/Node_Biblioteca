'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    nombre: String,
    informacion: [{
        descripcion:String,
        imagen: String
    }]
});

module.exports = mongoose.model("categorias", CategoriaSchema); 