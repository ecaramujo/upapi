function iniciaLivros(){
    carregarLivros()
}

function carregarLivros() {
    buscarLivros((erro, livros) => {
        buscarAutores((erro, autores) => {
            renderTabela(livros, autores);
        })
    })
}

function carregarForm(livro){
    buscarAutores((erro, autores) => {
        renderForm(livro, autores);
    })
    
}

function salvarLivro(livro){
    if(!livro.id_livro) {
        inserirLivro(livro, (erro,livro)=> {
            console.log(livro);
            carregarLivros();
        })    
    }
    else {
        atualizarLivro(livro.id_livro, livro, (erro, livro) => {
            console.log(livro);
            carregarLivros();
        })
    }
}

/* function verificaIsbn(livro){
    buscarLivros((erro, livros) => {
        console.log("LIVROS **", livros, "LIVRO***", livro)
        for(var i in livros){
            if(livros[i].isbn == parseInt(livro.isbn)){
                alert(`Livro ${livro.isbn} não pode ser cadastrado, o ISBN é repetido!`);
                carregarLivros();
            }
        }
    })  
}
 */

//Eventos
function onSalvar(livro){
    console.log("Livro: ", livro);
    salvarLivro (livro);
    carregarLivros();
}

function onCancelar(){
    carregarLivros();
    
}

function onEdit(id_livro){
    buscarLivro(id_livro, (erro, livro) => {
        console.log("Carregando Livro "+livro.nome);
        carregarForm(livro);
    });
}

function onSearch(nome){
    buscarPorNome(nome, (erro, livros) => {
        if (erro){
            alert(`Livro ${nome} não encontrado!`);
            carregarLivros();
        }
        else{
        console.log(livros);
        renderTabela(livros);
        }
    });
}


function onDeletar(id_livro){
    console.log(id_livro);
    buscarPorLocacoesid_livro(id_livro, (erro, locacoes) => {
        if (erro){
            console.log(erro);
            deletarLivro(id_livro, (erro, livro) => {
                console.log(id_livro)
                alert(`Livro ${livro.nome} removido o com sucesso!`);
                carregarLivros();
            });
        }
        else{
            console.log(locacoes);
            alert(`Não é possível deletar este Livro. Ele possui locações ativas!`);
            carregarLivros();
        }
    })
}
















