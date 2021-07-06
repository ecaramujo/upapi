const express = require('express')
const router = express.Router()
const usuariosController = require("../controllers/usuariosController")

// GET method route

router.post("/", usuariosController.validarUsuario);


module.exports = router;
/* 
"jsonwebtoken": "^8.5.1", */