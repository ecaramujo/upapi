const con = require("../config/conexaoBD")

exports.listar = (callback) => {
    const sql = "SELECT * FROM livros";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.listarDisponivel = (callback) => {
    const sql = "SELECT * FROM livros WHERE quantidade>0";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.listarIndisponivel = (callback) => {
    const sql = "SELECT * FROM livros WHERE quantidade=0";
    con.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.inserir = (livro, callback) => {
    const sql = "INSERT INTO livros (isbn, nome, id_autor, editora, ano, quantidade) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sql, [livro.isbn, livro.nome, livro.id_autor, livro.editora, livro.ano, livro.quantidade], (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            livro.id_livro = rows.insertId;
            callback(null, livro)
        }
    })
}

exports.buscarPorid_livro = (id_livro, callback) => {
    const sql = "SELECT * FROM livros WHERE id_livro=?";
    con.query(sql, [id_livro], (err, rows) => {
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
                    msg: "Livro não encontrado"
                }
                callback(err, null);
            }
        }
    })
}

exports.buscarPorNome = (nome, callback) => {
    const sql = "SELECT * FROM livros WHERE nome=?";
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
                    msg: "Nome de livro não encontrado"
                }
                callback(err,null);
            }
        }
    })
}

exports.buscarPorid_autor = (id_autor, callback) => {
    const sql = "SELECT * FROM livros WHERE id_autor=?";
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
                    msg: "id_autor de livro não encontrado"
                }
                callback(err,null);
            }
        }
    })
}




exports.deletar = (id_livro, callback) => {
    const sql = "DELETE FROM livros WHERE id_livro=?";
    con.query(sql, [id_livro], (err, rows) => {
        if(err){
            const err = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows){
                callback(null, id_livro);
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

/* exports.buscarPorNomeLivro = (livronome, callback) => {
    const sql = "SELECT * FROM livros WHERE nome=?";
    con.query(sql, [livronome], (err, rows) => {
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
                    msg: "Livro não encontrado"
                }
                callback(err, null);
            }
        }
    })
} */
