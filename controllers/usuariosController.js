const usuariosRepository = require('../repository/usuariosRepository')
const jwt = require("jsonwebtoken")

exports.validarUsuario = (req, res) => {
    if(req.body && req.body.username && req.body.password){
        const username = req.body.username;
        const password = req.body.password;
        usuariosRepository.buscarPorUsername(username, (err, usuario) => {
            if(err){
                if(err.status == 404){
                    const errusername = {
                        status: 401, 
                        msg: "Usuario ou Password Invalido"
                    }
                    res.status(errusername.status).json(errusername);
                }
                else {
                res.status(err.status).json(err);
                }
            }
            else {
                if(usuario.password == password){
                    const token = jwt.sign({
                        id: usuario.id_usuario,
                        username: usuario.username
                    }, "Sen@cBiblioteca", {expiresIn: "1h"});
                    res.status(201).json({token}) 
                }
                else{
                    const errusername = {
                        status: 401, 
                        msg: "Password Invalido"
                    }
                    res.status(errusername.status).json(errusername);
                }
            }
        })
    }
    else{
        const errusername = {
            status: 400, 
            msg: "Usuário ou Password inexistentes"
        }
        res.status(errusername.status).json(errusername);
    }
}

exports.validarToken = (req, res, next) => {
    console.log(req)
    const token = req.get("x-auth-token");
    if(!token){
        const err = {
            status: 403,
            msg: "Não tem token de acesso"
        }
        res.status(err.status).json(err);
    }
    else{
        jwt.verify(token, "Sen@cBiblioteca", (err, payload) => {
            if(err){
                const err = {
                    status: 403, 
                    msg: "Token Inválido"
                    }
                res.status(err.status).json(err);
            }
            else{
                console.log("Id do Usuário: "+payload.id);
                next();
            }
        }
    )}
}