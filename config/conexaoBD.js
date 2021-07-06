const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api_biblioteca"
});

module.exports = con