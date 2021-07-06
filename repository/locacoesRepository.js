const con = require("../config/conexaoBD")

exports.listar = (callback) => {
    const sql = "SELECT * FROM locacoes";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.listarAguardando = (callback) => {
    const sql = "SELECT * FROM locacoes WHERE status='Aguardando Devolução'";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.listarDevolvido = (callback) => {
    const sql = "SELECT * FROM locacoes WHERE status='Devolvido'";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.retirar = (locacao, callback) => {
    const data_retirada = new Date(); //pega data atual
    const data_estimada_entrega = new Date(); 
    data_estimada_entrega.setDate(data_retirada.getDate() + 5); //pega data atual + 5 dias
    const sql = "INSERT INTO locacoes (id_cliente, id_livro, data_retirada, data_estimada_entrega, status) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, [locacao.id_cliente, locacao.id_livro, data_retirada, data_estimada_entrega, "Aguardando Devolução"], (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            locacao.id_locacao = rows.insertId;
            callback(null, locacao)
        }
    })
}

exports.buscarPorid_locacao = (id_locacao, callback) => {
    console.log(id_locacao)
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
                callback(null, rows[0])
            }
            else{ 
                const err = {
                    status: 404,
                    msg: "Locação não encontrada"
                }
                callback(err, null);
            }
        }
    })
}


exports.buscarPorLocacoesid_cliente = (id_cliente, callback) => {
    const sql = "SELECT * FROM locacoes WHERE id_cliente=?";
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
                callback(null, rows)
            }
            else{ 
                const err = {
                    status: 404,
                    msg: "Locação não encontrada"
                }
                callback(err, null);
            }
        }
    })
}


exports.buscarPorLocacoesid_livro = (id_livro, callback) => {
    const sql = "SELECT * FROM locacoes WHERE id_livro=? and status=?";
    con.query(sql, [id_livro, "Aguardando Devolução"], (err, rows) => {
        if(err){
            const err = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null, rows)
            }
            else{ 
                const err = {
                    status: 404,
                    msg: "Locação não encontrada"
                }
                callback(err, null);
            }
        }
    })
}


/* 
exports.buscarPorNome = (nome, callback) => {
    const sql = "SELECT * FROM locacoes WHERE nome=?";
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
                    msg: "Nome de locacao não encontrado"
                }
                callback(err,null);
            }
        }
    })
}

exports.buscarPorid_autor = (id_autor, callback) => {
    const sql = "SELECT * FROM locacoes WHERE id_autor=?";
    con.query(sql, [id_autor], (err, rows) => {
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
                    msg: "id_autor de locacao não encontrado"
                }
                callback(err,null);
            }
        }
    })
}



exports.buscarPorid_autor = (id_autor, callback) => {
    const sql = "SELECT * FROM locacoes WHERE id_autor=?";
    con.query(sql, [id_autor], (err, rows) => {
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
                    msg: "Este Autor não possui locacoes."
                }
                callback(err,null);
            }
        }
    })
}




exports.deletar = (id_locacao, callback) => {
    const sql = "DELETE FROM locacoes WHERE id_locacao=?";
    con.query(sql, [id_locacao], (err, rows) => {
        if(err){
            const err = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows){
                callback(null, id_locacao);
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

exports.buscarPorNomelocacao = (locacaonome, callback) => {
    const sql = "SELECT * FROM locacoes WHERE nome=?";
    con.query(sql, [locacaonome], (err, rows) => {
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
                    msg: "locacao não encontrado"
                }
                callback(err, null);
            }
        }
    })
} */
