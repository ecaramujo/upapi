const clientesRepository = require('../repository/clientesRepository')
const con = require("../config/conexaoBD")

exports.listar = (req, res) => {
    clientesRepository.listar((err, cliente) => {
        if(err){
            res.status(500).json({"err:":"Database Err"})
            console.log(err)
        }
        else {
            res.json(cliente)
        }
    })
}

exports.inserir = (req, res) => {
    // Obter o dado do resquest - dados do cliente
    const cliente = req.body;
    // Validar os dados
    if(!cliente || !cliente.matricula || !cliente.nome || !cliente.telefone){
        res.status(400).json({"err:":"O cliente deve ter todos os seus dados preenchidos"})
    }
    clientesRepository.inserir(cliente, (err, clientesalvo) => {
        if(err){
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            res.status(201).json(clientesalvo)
        }
    })
}

exports.buscarPorNome = (req, res) => {    
    if(req.query && req.query.nome){
        const nome = req.query.nome;
        clientesRepository.buscarPorNome(nome, (err, cliente) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(cliente);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessário especificar nome do cliente."})
    }
}


exports.buscarPorid_cliente = (req, res) => {
    const id_cliente = req.params.id_cliente;
    if(isNaN(id_cliente)){
        const err = {
            status: 400,
            msg: "id_cliente deve ser um numero"
        }
        res.status(err.status).json(err)
    }
    else{
        clientesRepository.buscarPorid_cliente(id_cliente, (err, cliente) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                res.json(cliente)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id_cliente = req.params.id_cliente;
    const cliente = req.body;
    const sql = "UPDATE clientes SET matricula=?, nome=?, telefone=? WHERE id_cliente=?";
    con.query(sql, [cliente.matricula, cliente.nome, cliente.telefone, id_cliente], (err, rows) => {
        if (err) {
            res.status(500).json({"err:":"Database err"})
            console.log(err)
        }
        else {
            cliente.id_cliente = +id_cliente; // Converte String para Int sem user parseInt
            res.json(cliente);
        }
    })
}

// cliente retirando um livro
exports.atualizarRetirada = (cliente) => {
    const sql = "UPDATE clientes SET locacao=? WHERE id_cliente=?";
    con.query(sql, [cliente.locacao + 1, cliente.id_cliente])
}

// cliente devolvendo um livro
exports.atualizarDevolucao = (id_cliente) => {
    clientesRepository.buscarPorid_cliente(id_cliente, (err, cliente) => {
        const sql = "UPDATE clientes SET locacao=? WHERE id_cliente=?";
        con.query(sql, [cliente.locacao -1, id_cliente])
    })
}

exports.deletar = (req, res) => {
    const id_cliente = req.params.id_cliente;
    if(isNaN(id_cliente)){
        const err = {
            status: 400,
            msg: "id_cliente deve ser um número"
        }
        res.status(err.status).json(err)
    }
    else{
        clientesRepository.buscarPorid_cliente(id_cliente, (err, cliente) => {
            if(err){
                res.status(err.status).json(err)
            }
            else {
                clientesRepository.deletar (id_cliente, (err, id_cliente) => {
                    if(err){
                        res.status(err.status).json(err)
                    }
                    else {
                        res.json(cliente)
                    }        
                })
            }
        })
    }
}