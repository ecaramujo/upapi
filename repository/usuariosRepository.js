const con = require("../config/conexaoBD")

exports.buscarPorUsername = (username, callback) => {
    const sql = "SELECT * FROM usuarios WHERE username=?";
    con.query(sql, [username], (err, rows) => {
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
                    msg: "usuario não encontrado"
                }
                callback(err, null);
            }
        }
    })
}
