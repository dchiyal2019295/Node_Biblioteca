'use strict'
// IMPORTACIONES
var img = require("../modelos/imagenes.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");
var fs = require('fs');
var path = require('path');



function agregarImg(req, res) {
    var  imgModel = new img();
    var params = req.body;
    console.log(params);
    if (params.DivInv && params.Titulo  && params.tipo) {
        
        imgModel.DivInv = params.DivInv;
        imgModel.Titulo = params.Titulo;
        imgModel.tipo = params.tipo;
        imgModel.img = null;

        img.find({
            $or: [
                { Titulo: params.Titulo }
                
            ]
        }).exec((err, imageEncontrados) => {
            //tiene datos = true || no tiene datos = falso
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });

            if (imageEncontrados && imageEncontrados.length >= 100) {
                return res.status(500).send({ mensaje: 'Ya existen varios titulos similares.' });
            } else {
                

                imgModel.save((err, imageGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion al agregar su  archivo.' });

                        if (imageGuardado) {
                            res.status(200).send({ imageGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido agregar su archivo' })
                        }
                    })
                
            }
        })

    }
}

function subirImagenImg(req, res) {
    var idImg= req.user.sub;

    if (req.files) {
        var direccionArchivo = req.files.imagen.path;
        console.log(direccionArchivo);

      
        var direccion_split = direccionArchivo.split('\\')
        console.log(direccion_split);

        var nombre_archivo = direccion_split[3];
        console.log(nombre_archivo);

        var extension_archivo = nombre_archivo.split('.');
        console.log(extension_archivo);

        var nombre_extension = extension_archivo[1].toLowerCase();
        console.log(nombre_extension);

        if(nombre_extension === 'png' || nombre_extension === 'jpg' || nombre_extension === 'gif'){
            img.findByIdAndUpdate(idImg, { imagen:  nombre_archivo}, {new: true} ,(err, imgEncontrado)=>{
                return res.status(200).send({imgEncontrado});
            })
        }else{
            return eliminarArchivo(res, direccionArchivo, 'Extension, no permitida');
        }
    }
}


module.exports = {
    agregarImg,
    subirImagenImg

}