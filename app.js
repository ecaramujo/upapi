const port = 3000
const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router();
const usuariosController = require("./controllers/usuariosController")

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Router
const authRouter = require("./routers/authRouter")
app.use("/api/auth", authRouter);

//Middleware
//app.use(usuariosController.validarToken)

//Router
const livrosRouter = require("./routers/livrosRouter")
app.use("/api/livros", livrosRouter);

//Router
const clientesRouter = require("./routers/clientesRouter")
app.use("/api/clientes", clientesRouter);

//Router
const autoresRouter = require("./routers/autoresRouter")
app.use("/api/autores", autoresRouter);

//Router
const locacoesRouter = require("./routers/locacoesRouter")
app.use("/api/locacoes", locacoesRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});








// JavaScript program to illustrate 
// calculation of no. of days between two date 

// To set two dates to two variables

// To calculate the time difference of two dates
/* s */


/* const livro_objeto = require("./livro");
const CadastroLivros = require("./cadastro_livros");

let cadastrolivros = new CadastroLivros();

/* const livro = new livro_objeto(1, 2877, "Harry", 1, "Abril", 1998);

cadastrolivros.inserir(livro); */
/*  
cadastrolivros.listar(function (err, livro){
    if (err) throw err;
    console.log(livro);
});
 */

/* 
//SELECT
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM livros", function (err, result, fields) {
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});

//INSERT
con.connect(function(err) {
    const sql = "INSERT INTO livros (isbn, nome, id_autor, editora, ano) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, [8525, "Anjos", 5, "Abril", 2011], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        
    });
});


console.log("Rodando API Biblioteca")

 */




/* const livro_objeto = require("./livro");
const CadastroLivros = require("./cadastro_livros");

let cadastrolivros = new CadastroLivros();

const livro = new livro_objeto(1,1234, "Harry", 1, "Abril", 1998);

cadastrolivros.inserir(livro);
cadastrolivros.inserir(new livro_objeto(2, 3333, "Rei", 3, "Abril", 2003));
cadastrolivros.inserir(new livro_objeto(3, 2222, "Senhor", 2, "Abril", 2001));

for(let livro of cadastrolivros.listar()){
    console.log (`livro ${livro.id_livro}: ${livro.isbn}, ${livro.id_autor}, ${livro.editora}, ${livro.ano}`);
};


cadastrolivros.deletar(2);

cadastrolivros.atualizar(2, new livro_objeto(4, 4444, "Codigo", 4, "Abril", 2005));

console.log(cadastrolivros.listar());

 */