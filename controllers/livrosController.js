const livrosRepository = require('../repository/livrosRepository')
const autoresRepository = require('../repository/autoresRepository')
const con = require("../config/conexaoBD")

exports.listar = (req, res) => {
    livrosRepository.listar((err, livro) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(livro)
        }
    })
}

exports.listarDisponivel = (req, res) => {
    livrosRepository.listarDisponivel((err, livro) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(livro)
        }
    })
}

exports.listarIndisponivel = (req, res) => {
    livrosRepository.listarIndisponivel((err, livro) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(livro)
        }
    })
}

exports.inserir = (req, res) => {
    // Obter o dado do resquest - dados do livro
    const livro = req.body;
    // Validar os dados
    if(!livro.isbn || !livro.nome || !livro.id_autor || !livro.editora || !livro.ano|| !livro.quantidade){
        res.status(400).json({"err:":"O livro deve ter todos os seus dados preenchidos de forma correta"})
    }
    const id_autor = req.body.id_autor;
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
                livrosRepository.inserir(livro, (err, livroSalvo) => {
                    if(err){
                        res.status(500).json({"err:":"Database err"})
                        console.log(err)
                    }
                    else {
                        res.status(201).json(livroSalvo)
                    }
                })
            }
        })
    }
}

exports.buscarPorid_livro = (req, res) => {
    const id_livro = req.params.id_livro;
    if(isNaN(id_livro)){
        const err = {
            status: 400,
            msg: "Id_livro deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        livrosRepository.buscarPorid_livro(id_livro, (err, livro) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                res.json(livro)
            }
        })
    }
}

exports.buscarPorNome = (req, res) => {    
    if(req.query && req.query.nome){
        const nome = req.query.nome;
        livrosRepository.buscarPorNome(nome, (err, livro) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(livro);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessário especificar nome do livro."})
    }
}

exports.buscarPorid_autor = (req, res) => {    
    if(req.query && req.query.id_autor){
        const id_autor = req.query.id_autor;
        livrosRepository.buscarPorid_autor(id_autor, (err,livro) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(livro);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessário especificar id_autor do id do autor."})
    }
}

/* exports.buscarPorid_autor = (req, res) => {    
    if(req.query && req.query.id_autor){
        const id_autor = req.query.id_autor;
        livrosRepository.buscarPorid_autor(id_autor, (err,livro) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(livro);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar nome do id do autor."})
    }
}
 */

exports.atualizar = (req, res) => {
    const id_livro = req.params.id_livro;
    const livro = req.body;
    autoresRepository.buscarPorid_autor(livro.id_autor, (err) => {
        if(err){
            res.status(err.status).json(err);
        }
        else {
            const sql = "UPDATE livros SET isbn=?, nome=?, id_autor=?, editora=?, ano=?, quantidade=? WHERE id_livro=?";
            con.query(sql, [livro.isbn, livro.nome, livro.id_autor, livro.editora, livro.ano, livro.quantidade, id_livro], (err, rows) => {
                if (err) {
                    res.status(500).json({"err:":"Database err"})
                    console.log(err)
                }
                else {
                    livro.id_livro = +id_livro; // Converte String para Int sem user parseInt
                    res.json(livro);
                }
            })
        }
    });
}


exports.atualizarRetirada = (livro) => {
    const sql = "UPDATE livros SET quantidade=? WHERE id_livro=?";
    con.query(sql, [livro.quantidade - 1, livro.id_livro])
}

exports.atualizarDevolucao = (id_livro) => {
    livrosRepository.buscarPorid_livro(id_livro, (err, livro) => {
        const sql = "UPDATE livros SET quantidade=? WHERE id_livro=?";
        con.query(sql, [livro.quantidade+1, id_livro])
    })
}

exports.deletar = (req, res) => {
    const id_livro = req.params.id_livro;
    if(isNaN(id_livro)){
        const err = {
            status: 400,
            msg: "Id_livro deve ser um número"
        }
        res.status(err.status).json(err)
    }
    else{
        livrosRepository.buscarPorid_livro(id_livro, (err, livro) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                livrosRepository.deletar (id_livro, (err, id_livro) => {
                    if(err){
                        res.status(err.status).json(err)
                    }
                    else {
                        res.json(livro)
                    }        
                })
            }
        })
    }
}

/* exports.buscarPorNomeLivro = (req, res) => {
    const livronome = req.params.nome;
/*     if(isNaS(livronome)){
        const err = {
            status: 400,
            msg: "Livro deve ser uma string"
        }
        res.status(err.status).json(err)
    } 
    else{
    livrosRepository.buscarPorNomeLivro(livronome, (err, livro) => {
        if(err){
            res.status(err.status).json(err)
        }
        else {
            res.json(livro)
        }
    })
} */