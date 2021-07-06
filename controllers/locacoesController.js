const locacoesRepository = require('../repository/locacoesRepository')
const clientesRepository = require('../repository/clientesRepository')
const clientesController = require('../controllers/clientesController')
const livrosRepository = require('../repository/livrosRepository')
const livrosController = require('../controllers/livrosController')
const con = require("../config/conexaoBD")


/// Todas locacoes
exports.listar = (req, res) => {
    locacoesRepository.listar((err, locacao) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(locacao)
        }
    })
}


/// Locacoes em aberto
exports.listarAguardando = (req, res) => {
    locacoesRepository.listarAguardando((err, locacao) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(locacao)
        }
    })
}


/// Locacoes já entregues
exports.listarDevolvido = (req, res) => {
    locacoesRepository.listarDevolvido((err, locacao) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(locacao)
        }
    })
}


/// Realizar uma locacao
exports.retirar = (req, res) => {
    // Obter o dado do resquest - dados da locacao
    const locacao = req.body;
    // Validar os dados
    if(!locacao.id_cliente || !locacao.id_livro){
        res.status(400).json({"err:":"A locação deve ter todos os dados preenchidos de forma correta"})
    }// Valida id livro
    const id_livro = req.body.id_livro;
    if(isNaN(id_livro)){
        const err = {
            status: 400,
            msg: "Id_livro deve ser um numero"
        }
        res.status(err.status).json(err)
    }// Valida existencia do livro
    else{
        livrosRepository.buscarPorid_livro(id_livro, (err, livro) => {
            if(err){
                res.status(err.status).json(err)
            }// Valida quantidade do livro
            else {
                if(livro.quantidade == 0){
                    res.json({"msg:":"Não possuimos mais cópias disponíveis desse livro"})
                }
                else{// Valida id cliente
                    const id_cliente = req.body.id_cliente;
                    if(isNaN(id_cliente)){
                        const err = {
                            status: 400,
                            msg: "id_cliente deve ser um numero"
                        }
                        res.status(err.status).json(err)
                    }// Valida existencia do cliente
                    else{
                        clientesRepository.buscarPorid_cliente(id_cliente, (err, cliente) => {
                            if(err){
                                res.status(err.status).json(err)
                            }// Valida quantidade de locacoes do cliente
                            else {
                                if(cliente.locacao == 3){
                                    res.json({"msg:":"Este cliente já possui 3 locações, não é possível retirar mais livros"})
                                }
                                else{// Passa pro banco fazer a inserção da locacão
                                    locacoesRepository.retirar(locacao, (err, locacaoretirada) => {
                                        if(err){
                                            res.status(500).json({"err:":"Database err"})
                                            console.log(err)
                                        }
                                        else {// Realiza a inserção e atualiza as tabelas de clientes e livros
                                            res.status(201).json(locacaoretirada),
                                            clientesController.atualizarRetirada(cliente),
                                            livrosController.atualizarRetirada(livro) 
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            }
        })
    }
}



// Buscar pela ID da locacao
exports.buscarPorid_locacao = (req, res) => {
    const id_locacao = req.params.id_locacao;
    if(isNaN(id_locacao)){
        const err = {
            status: 400,
            msg: "Id_locacao deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        locacoesRepository.buscarPorid_locacao(id_locacao, (err, locacao) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                res.json(locacao)
            }
        })
    }
}

exports.buscarPorLocacoesid_cliente = (req, res) => {
    const id_cliente = req.params.id_cliente;
    if(isNaN(id_cliente)){
        const err = {
            status: 400,
            msg: "id_cliente deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        locacoesRepository.buscarPorLocacoesid_cliente(id_cliente, (err, locacao) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                res.json(locacao)
            }
        })
    }
}

exports.buscarPorLocacoesid_livro = (req, res) => {
    const id_livro = req.params.id_livro;
    console.log(id_livro)
    if(isNaN(id_livro)){
        const err = {
            status: 400,
            msg: "id_livro deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        locacoesRepository.buscarPorLocacoesid_livro(id_livro, (err, locacoes) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                res.json(locacoes)
            }
        })
    }
}




// Devolver uma locacao
exports.devolver = (req, res) => {
    const id_locacao = req.params.id_locacao;
    const locacao = req.body;
    if (locacao.status == "Devolvido"){
        const err = {
            status: 400,
            msg: "Livro já devolvido"
        }
        res.status(err.status).json(err)
    }
    else{
    const data_real_entrega = new Date();
    data_real_entrega.setDate(data_real_entrega.getDate() + 10);
    console.log(data_real_entrega);
    const sql = "UPDATE locacoes SET status=?, data_real_entrega=? WHERE id_locacao=?";
    con.query(sql, ["Devolvido", data_real_entrega, id_locacao], (err, rows) => {
        if (err) {
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            function getDifferenceInDays(date1, date2) {
                const diffInMs = Math.abs(date2 - date1);
                return diffInMs / ( 1000 * 60 * 60 * 24);
            }
            const date1 = new Date(locacao.data_estimada_entrega);
            const date2 = new Date(data_real_entrega);
            console.log(data_real_entrega);
            clientesController.atualizarDevolucao(locacao.id_cliente),
            livrosController.atualizarDevolucao(locacao.id_livro),
            diferenca = getDifferenceInDays(date1, date2);
            console.log(diferenca);
            if (date1 < date2){
                res.json({"msg:":`O livro foi devolvido ! Ele está com um atraso de ${parseInt(diferenca)} dias !`})
            }
            else{
                res.json({"msg:":"O livro foi devolvido ! Ele está dentro do prazo de entrega !"})
            }
        }
    })
    }
}



/* 

const date1 = new Date("2021-06-03T03:00:00.000Z");
const date2 = new Date("2021-06-03T18:00:00.000Z");
const date3 = new Date("2021-06-03T03:00:00.000Z");
console.log(getDifferenceInDays(date1, date2));
console.log(getDifferenceInHours(date1, date2));
console.log(getDifferenceInMinutes(date1, date2));
console.log(getDifferenceInSeconds(date1, date2));

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
}

function getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60);
}

function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
}

function getDifferenceInSeconds(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
}

 */
/* 
function updateLocacao(locacao, res) {
    const sql = "UPDATE locacoes SET status=? WHERE id_locacao=?";
    con.query(sql, ["devolvido", locacao.id_locacao], (err, rows) => {
        if (err) {
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            console.log(res.json(locacao))
            locacao.id_locacao = +id_locacao; // Converte String para Int sem user parseInt
            return(res.json(locacao))
        }
    })
}



/*
exports.atualizar = (req, res) => {
    const sql = "UPDATE locacao SET status=? WHERE id_locacao=?";
    con.query(sql, ["devolvido", locacao,id_locacao], (err, rows) => {
        if (err) {
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            locacao.id_locacao = +id_locacao; // Converte String para Int sem user parseInt
            res.json(locacao);
        }
    })
}





/*         atualizar = (locacao, res) => {
                const locacao = locacao;
                const sql = "UPDATE locacoes SET nome=?, pais_origem=? WHERE id_autor=?";
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
            } */
/* 

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
























































































exports.buscarPorNome = (req, res) => {    
    if(req.query && req.query.nome){
        const nome = req.query.nome;
        locacoesRepository.buscarPorNome(nome, (err, locacao) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(locacao);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessário especificar nome do locacao."})
    }
}


exports.buscarPorid_autor = (req, res) => {    
    if(req.query && req.query.id_autor){
        const id_autor = req.query.id_autor;
        locacoesRepository.buscarPorid_autor(id_autor, (err,locacao) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(locacao);
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
        locacoesRepository.buscarPorid_autor(id_autor, (err,locacao) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(locacao);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar nome do id do autor."})
    }
}
 */

/// Realizar uma devolucao





/* 

const sql = "SELECT livros FROM locacoes WHERE id_locacao=?";
con.query(sql, (err, rows) => {
    if (err) {
        callback(err, null)
    }
    else {
        callback(null, rows)
    }
})



/* 
exports.inserir = (req, res) => {
    const id_locacao = req.params.id_locacao;
    if(isNaN(id_locacao)){
        const err = {
            status: 400,
            msg: "Id_locacao deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        buscarPorid_locacao = (id_locacao, locacao) => {
            const sql = "SELECT * FROM locacoes WHERE id_locacao=?";
            con.query(sql, [id_locacao], (err, rows) => {
                if(err){
                    const err = {
                        status: 500,
                        msg: err
                    }
                    callback(err, null);
                }
                else {
                    if(rows && rows.length > 0){
                        locacao(null, rows[0])
                    }
                    else{ 
                        const err = {
                            status: 404,
                            msg: "locacao não encontrado"
                        }
                        locacao(err, null);
                    }
                }
            })
        }
    }
} */






/* 
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






exports.devolver = (req, res) => {
    const id_locacao = req.params.id_locacao;
    if(isNaN(id_locacao)){
        const err = {
            status: 400,
            msg: "Id_locacao deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        locacoesRepository.buscarPorid_locacao(id_locacao, (err, locacao) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                console.log(locacao);
                const sql = "UPDATE locacoes SET status=? WHERE id_locacao=?";
                con.query(sql, ["Devolvido", locacao.id_locacao], (err, locacao) => {
                    if (err) {
                        res.status(500).json({"err:":"Database err"})
                        console.log(err)
                    }
                    else {
                        clientesController.atualizarDevolucao(locacao.id_cliente),
                        livrosController.atualizarDevolucao(locacao.id_livro),
                        console.log(locacao);
                        res.json(locacao);
                    }
                })
            }
        })
    }
} */


exports.atualizar = (req, res) => {
    const id_locacao = req.params.id_locacao;
    const locacao = req.body;
    const sql = "UPDATE locacoes SET isbn=?, nome=?, id_autor=?, editora=?, ano=?, quantidade=? WHERE id_locacao=?";
    con.query(sql, [locacao.isbn, locacao.nome, locacao.id_autor, locacao.editora, locacao.ano, locacao.quantidade, id_locacao], (err, rows) => {
        if (err) {
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            clientesController.atualizarDevolucao(cliente),
            livrosController.atualizarDevolucao(livro),
            res.json(locacao);
        }
    })
}


exports.deletar = (req, res) => {
    const id_locacao = req.params.id_locacao;
    if(isNaN(id_locacao)){
        const err = {
            status: 400,
            msg: "Id_locacao deve ser um número"
        }
        res.status(err.status).json(err)
    }
    else{
        locacoesRepository.buscarPorid_locacao(id_locacao, (err, locacao) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                locacoesRepository.deletar (id_locacao, (err, id_locacao) => {
                    if(err){
                        res.status(err.status).json(err)
                    }
                    else {
                        res.json(locacao)
                    }        
                })
            }
        })
    }
}

/* exports.buscarPorNomelocacao = (req, res) => {
    const locacaonome = req.params.nome;
/*     if(isNaS(locacaonome)){
        const err = {
            status: 400,
            msg: "locacao deve ser uma string"
        }
        res.status(err.status).json(err)
    } 
    else{
    locacoesRepository.buscarPorNomelocacao(locacaonome, (err, locacao) => {
        if(err){
            res.status(err.status).json(err)
        }
        else {
            res.json(locacao)
        }
    })
} */