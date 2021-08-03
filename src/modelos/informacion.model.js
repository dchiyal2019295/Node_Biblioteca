'use strict'
var moongose = require("mongoose");
var Schema = moongose.Schema;

var InfoSchema = Schema({
DivInv : String,   
Titulo: String,
Subtitulo: String,
Info: String,
referencia: String,
tipo: String,
img: String



 
});

module.exports = moongose.model("informaciones", InfoSchema);