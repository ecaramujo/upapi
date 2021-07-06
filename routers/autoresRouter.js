const express = require('express')
const router = express.Router()
const autoresController = require("../controllers/autoresController")

// GET method route

router.get("/", autoresController.listar);
router.post("/", autoresController.inserir);
router.get("/:id_autor", autoresController.buscarPorid_autor);
router.put("/:id_autor", autoresController.atualizar);
router.delete("/:id_autor", autoresController.deletar);

module.exports = router;