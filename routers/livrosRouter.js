const express = require('express')
const router = express.Router()
const livrosController = require("../controllers/livrosController")

// GET method route

router.get("/", livrosController.listar);
router.get("/listarDisponivel", livrosController.listarDisponivel);
router.get("/listarIndisponivel", livrosController.listarIndisponivel);
router.post("/", livrosController.inserir);
router.get("/nome", livrosController.buscarPorNome);
router.get("/autor/:id_autor", livrosController.buscarPorid_autor);
router.get("/:id_livro", livrosController.buscarPorid_livro);
router.put("/:id_livro", livrosController.atualizar);
router.delete("/:id_livro", livrosController.deletar);

module.exports = router





/* router.get('/:id_livro', (req, res) => {
    res.send(`Buscando Livro ${req.params.id_livro}`)
})

router.put('/:id_livro', (req, res) => {
    res.send(`Atualizando Livro ${req.params.id_livro}`)
})

router.delete('/:id_livro', (req, res) => {
    res.send(`Deletando Livro ${req.params.id_livro}`)
})
 */

/* router.get('/', (req, res) => {
    res.json({message: "Listando Produtos"})
})

router.get('/:id_livro', (req, res) => {
    res.send('Listando o Livro com esse id_livro')
})

router.post('/', (req, res) => {
    console.log(req.body);
    let livro = req.body;
    livro.id_livro = 1;
    res.status(201).json(livro);
    res.send(`Inserindo Livro com nome de ${req.body.nome}`)
})

router.put('/:id_livro', (req, res) => {
    let livro = {
        id_livro: 1,
        isbn: 6888,
        nome: "Harry  Corrente Potter",
        id_autor: 1,
        editora: "Bloomsbury Publishing",
        ano: 1998
    };

    if (req.params.id == 1){       
        livro.isbn = req.body.isbn;
        livro.nome = req.body.nome;
        livro.id_autor = req.body.id_autor;
        livro.editora = req.body.editora;
        livro.ano = req.body.ano;
        res.json(livro);
    }
    
    else {
        res.status(404).send("livro não encontrado");
    };
});

router.delete('/:id_livro', (req, res) => {
    res.send(`Deletando livro com nome de ${req.body.nome}`)
}) */