'use strict'
var Usuario = require("../modelos/usuario.model")
var bcrypt = require("bcrypt-nodejs")
var jwt = require("../servicios/jwt");

function agregarUsuario(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body; 

    if(params.nombre && params.email && params.password && params.rol){
        usuarioModel.nombre = params.nombre;
        usuarioModel.username = params.username;
        usuarioModel.email = params.email;
        usuarioModel.rol = params.rol;
        usuarioModel.imagen = null;

        Usuario.find({
            $or: [
                {username: usuarioModel.username},
                {email: usuarioModel.email}
            ]
        }).exec((err, usuarioEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            if(usuarioEncontrado && usuarioEncontrado.length >=1 ){
                return res.status(500).send({mensaje: "el usuario ya existe"});
            }else{
                bcrypt.hash(params.password, null, null ,(err, passwordEncriptada)=>{
                    usuarioModel.password = passwordEncriptada;
                    
                    usuarioModel.save((err, usuarioGuardado)=>{
                        if (err) return res.status(500).send({mensaje: "Error en la peticion"});
                        if(usuarioGuardado){
                            res.status(200).send({usuarioGuardado});
                        }else{
                            return res.status(500).send({mensaje: "no se ha podido guardar el usuario"})
                        }
                    })
                })
            } 
        })
    }
    
}

function login(req, res) {

    var params = req.body;

    Usuario.findOne({email: params.email}, (err, usuarioEncontrado)=>{
        if(err) return res.status(400).send({mensaje: "Error en la peticion"});

        if(usuarioEncontrado){
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passVerificada)=>{
                if(passVerificada){
                    if(params.getToken === 'true'){
                        return res.status(200).send({token: jwt.createToken(usuarioEncontrado)});

                    }else{
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({usuarioEncontrado});
                    }
                        
                    }else{
                        return res.status(500).send({mensaje: "el usuario no se ha podido identificar"})
                    }
            })
        }else{
            return res.status(401).send({mensaje: "Error al buscar el usuario"})
        }
    })

}

function editarUsuario(req, res) {
    var params = req.body;
    var idUSuario = req.params.id;

    Usuario.findByIdAndUpdate(idUSuario, params, {new: true}, (err, usuarioActualizado)=>{
        if (err) return res.status(401).send({mensaje: "error en la peticion"});
        if(usuarioActualizado){
            return res.status(200).send({usuarioActualizado});
        }
    })
    
}
function eliminarUsuario(req, res) {
    var idUsuario = req.params.id;

    Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado)=>{
        if (err) return res.status(401).send({mensaje: "Error en la peticion"});
        if(!usuarioEliminado){
            res.status(500).send({mensaje: "No se encontro el usuario"});  
        }else{
            return res.status(200).send({usuarioEliminado});
        }
    })
    
}
function obtenerUsuarios(req, res) {

    Usuario.find().exec((err, usuariosEncontrados)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});

        if(!usuariosEncontrados){
            res.status(401).send({mensaje: "No se encontraron usuarios"})
        }else{
            return res.status(200).send({usuariosEncontrados})
        }
    })
    
}
function obtenerUsuarioId(req, res) {
    var userID = req.params.id;

    Usuario.findById(userID, (err, usuarioEnontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuarioEnontrado){
            res.status(401).send({mensaje: "No se encontro el usuario"})
        }else{
            return res.status(200).send({usuarioEnontrado})
        }
    })
    
}

module.exports = {
    agregarUsuario,
    login,
    editarUsuario,
    eliminarUsuario,
    obtenerUsuarios,
    obtenerUsuarioId

}