'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusquedaSchema = Schema ({
    nombre: String
});

module.exports = mongoose.model('busqueda', BusquedaSchema);
