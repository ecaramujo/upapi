const con = require("../config/conexaoBD")

exports.listar = (callback) => {
    const sql = "SELECT * FROM clientes";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.inserir = (cliente, callback) => {
    const sql = "INSERT INTO clientes (matricula, nome, telefone) VALUES (?, ?, ?)"
    con.query(sql, [cliente.matricula, cliente.nome, cliente.telefone], (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            cliente.id_cliente = rows.insertId;
            callback(null, cliente)
        }
    })
}

exports.buscarPorNome = (nome, callback) => {
    const sql = "SELECT * FROM clientes WHERE nome=?";
    con.query(sql, [nome], (err, rows) => {
        if(err){            
            const err = {
                status: 500,
                msg: err
            }
            callback(err,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const err = {
                    status: 404,
                    msg: "Nome de cliente não encontrado"
                }
                callback(err,null);
            }
        }
    })
}


exports.buscarPorid_cliente = (id_cliente, callback) => {
    const sql = "SELECT * FROM clientes WHERE id_cliente=?";
    con.query(sql, [id_cliente], (err, rows) => {
        if(err){
            const err = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null, rows[0])
            }
            else{ 
                const err = {
                    status: 404,
                    msg: "cliente não encontrado"
                }
                callback(err, null);
            }
        }
    })
}

exports.deletar = (id_cliente, callback) => {
    const sql = "DELETE FROM clientes WHERE id_cliente=?";
    con.query(sql, [id_cliente], (err, rows) => {
        if(err){
            const err = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows){
                callback(null, id_cliente);
            }
            else {
                const err = {
                    status: 500,
                    msg: err
                }
                callback(err, null);    
            }
        }
    })            
}

