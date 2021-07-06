const autoresRepository = require('../repository/autoresRepository')
const con = require("../config/conexaoBD")

exports.listar = (req, res) => {
    autoresRepository.listar((err, autor) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(autor)
        }
    })
}

exports.inserir = (req, res) => {
    // Obter o dado do resquest - dados do autor
    const autor = req.body;
    // Validar os dados
    if(!autor || !autor.nome || !autor.pais_origem){
        res.status(400).json({"err:":"O autor deve ter todos os seus dados preenchidos"})
    }
    autoresRepository.inserir(autor, (err, autorsalvo) => {
        if(err){
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            res.status(201).json(autorsalvo)
        }
    })
}

exports.buscarPorid_autor = (req, res) => {
    const id_autor = req.params.id_autor;
    if(isNaN(id_autor)){
        const err = {
            status: 400,
            msg: "Id_autor deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        autoresRepository.buscarPorid_autor(id_autor, (err, autor) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                res.json(autor)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id_autor = req.params.id_autor;
    const autor = req.body;
    const sql = "UPDATE autores SET nome=?, pais_origem=? WHERE id_autor=?";
    con.query(sql, [autor.nome, autor.pais_origem, id_autor], (err, rows) => {
        if (err) {
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            autor.id_autor = +id_autor; // Converte String para Int sem user parseInt
            res.json(autor);
        }
    })
}

exports.deletar = (req, res) => {
    const id_autor = req.params.id_autor;
    if(isNaN(id_autor)){
        const err = {
            status: 400,
            msg: "id_autor deve ser um número"
        }
        res.status(err.status).json(err)
    }
    else{
        autoresRepository.buscarPorid_autor(id_autor, (err, autor) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                autoresRepository.deletar (id_autor, (err, id_autor) => {
                    if(err){
                        res.status(err.status).json(err)
                    }
                    else {
                        res.json(autor)
                    }        
                })
            }
        })
    }
}