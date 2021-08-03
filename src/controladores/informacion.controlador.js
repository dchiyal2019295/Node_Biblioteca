'use strict'
// IMPORTACIONES
var Info = require("../modelos/informacion.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");
var fs = require('fs');
var path = require('path');



function agregarInformacion(req, res) {
    var  infoModel = new Info();
    var params = req.body;
    console.log(params);
    if (params.DivInv && params.Titulo && params.Info && params.tipo) {
        
        infoModel.DivInv = params.DivInv;
        infoModel.Titulo = params.Titulo;
        infoModel.Subtitulo = params.Subtitulo;
        infoModel.Info = params.Info;
        infoModel.referencia = params.referencia;
        infoModel.tipo = params.tipo;
        infoModel.img = null;

        Info.find({
            $or: [
                { Titulo: params.Titulo },
                { Info: params.Info }
            ]
        }).exec((err, infoEncontrados) => {
            //tiene datos = true || no tiene datos = falso
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });

            if (infoEncontrados && infoEncontrados.length >= 100) {
                return res.status(500).send({ mensaje: 'Ya existen varios titulos similares.' });
            } else {
                

                    infoModel.save((err, infoGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion al agregar su Investigacion.' });

                        if (infoGuardado) {
                            res.status(200).send({ infoGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido agregar su Investigacion.' })
                        }
                    })
                
            }
        })

    }
}

function subirImagenInfo(req, res) {
    var idInfo = req.user.sub;

    if (req.files) {
        var direccionArchivo = req.files.imagen.path;
        console.log(direccionArchivo);

        // documentos/imagenes/foto_perfil.png  →  ['documentos', 'imagenes', 'foto_perfil.png']
        // Hola Mundo  →  ['Hola', 'Mundo']
        var direccion_split = direccionArchivo.split('\\')
        console.log(direccion_split);

        // src\imagenes\usuarios\nombre_imagen.png ← Nombre Archivo
        var nombre_archivo = direccion_split[3];
        console.log(nombre_archivo);

        var extension_archivo = nombre_archivo.split('.');
        console.log(extension_archivo);

        var nombre_extension = extension_archivo[1].toLowerCase();
        console.log(nombre_extension);

        if(nombre_extension === 'png' || nombre_extension === 'jpg' || nombre_extension === 'gif'){
            Info.findByIdAndUpdate(idInfo, { imagen:  nombre_archivo}, {new: true} ,(err, infoEncontrado)=>{
                return res.status(200).send({infoEncontrado});
            })
        }else{
            return eliminarArchivo(res, direccionArchivo, 'Extension, no permitida');
        }
    }
}


module.exports = {
    agregarInformacion,
    subirImagenInfo

}