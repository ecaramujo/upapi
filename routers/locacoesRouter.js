const express = require('express')
const router = express.Router()
const locacoesController = require("../controllers/locacoesController")

// GET method route

router.get("/", locacoesController.listar);
router.get("/listarAguardando", locacoesController.listarAguardando);
router.get("/listarDevolvido", locacoesController.listarDevolvido);
router.get("/:id_cliente", locacoesController.buscarPorLocacoesid_cliente);
router.get("/livro/:id_livro", locacoesController.buscarPorLocacoesid_livro);
router.get("/locacao/:id_locacao", locacoesController.buscarPorid_locacao);
router.post("/", locacoesController.retirar);
router.put("/:id_locacao", locacoesController.devolver); 

module.exports = router



/* router.get('/:id_locacao', (req, res) => {
    res.send(`Buscando locacao ${req.params.id_locacao}`)
})

router.put('/:id_locacao', (req, res) => {
    res.send(`Atualizando locacao ${req.params.id_locacao}`)
})

router.delete('/:id_locacao', (req, res) => {
    res.send(`Deletando locacao ${req.params.id_locacao}`)
})
 */

/* router.get('/', (req, res) => {
    res.json({message: "Listando Produtos"})
})

router.get('/:id_locacao', (req, res) => {
    res.send('Listando o locacao com esse id_locacao')
})

router.post('/', (req, res) => {
    console.log(req.body);
    let locacao = req.body;
    locacao.id_locacao = 1;
    res.status(201).json(locacao);
    res.send(`Inserindo locacao com nome de ${req.body.nome}`)
})

router.put('/:id_locacao', (req, res) => {
    let locacao = {
        id_locacao: 1,
        isbn: 6888,
        nome: "Harry  Corrente Potter",
        id_autor: 1,
        editora: "Bloomsbury Publishing",
        ano: 1998
    };

    if (req.params.id == 1){       
        locacao.isbn = req.body.isbn;
        locacao.nome = req.body.nome;
        locacao.id_autor = req.body.id_autor;
        locacao.editora = req.body.editora;
        locacao.ano = req.body.ano;
        res.json(locacao);
    }
    
    else {
        res.status(404).send("locacao não encontrado");
    };
});

router.delete('/:id_locacao', (req, res) => {
    res.send(`Deletando locacao com nome de ${req.body.nome}`)
}) */