const con = require("../config/conexaoBD")

exports.listar = (callback) => {
    const sql = "SELECT * FROM autores";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.inserir = (autor, callback) => {
    const sql = "INSERT INTO autores (nome, pais_origem) VALUES (?, ?)"
    con.query(sql, [autor.nome, autor.pais_origem], (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            autor.id_autor = rows.insertId;
            callback(null, autor)
        }
    })
}

exports.buscarPorid_autor = (id_autor, callback) => {
    const sql = "SELECT * FROM autores WHERE id_autor=?";
    con.query(sql, [id_autor], (err, rows) => {
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
                    msg: "Autor não encontrado"
                }
                callback(err, null);
            }
        }
    })
}

exports.deletar = (id_autor, callback) => {
    const sql = "DELETE FROM autores WHERE id_autor=?";
    con.query(sql, [id_autor], (err, rows) => {
        if(err){
            const err = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows){
                callback(null, id_autor);
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

