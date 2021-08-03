'use strict'
var moongose = require("mongoose");
var Schema = moongose.Schema;

var imgSchema = Schema({
 DivInv : String,   
Titulo: String,
tipo: String,
img: String



 
});

module.exports = moongose.model("images", imgSchema);