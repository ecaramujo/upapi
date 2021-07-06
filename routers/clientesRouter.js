const express = require('express')
const router = express.Router()
const clientesController = require("../controllers/clientesController")

// GET method route

router.get("/", clientesController.listar);
router.post("/", clientesController.inserir);
router.get("/nome", clientesController.buscarPorNome);
router.get("/:id_cliente", clientesController.buscarPorid_cliente);
router.put("/:id_cliente", clientesController.atualizar);
router.delete("/:id_cliente", clientesController.deletar);

module.exports = router;