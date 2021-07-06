function iniciaAutores(){
    carregarAutores()
}

function carregarAutores() {
        buscarAutores((erro, autores) => {
            console.log(autores, autores);
            renderTabela(autores);
        })
}


function carregarForm(autor){
    buscarAutores((erro, autores) => {
        console.log(autor, autores);
        renderForm(autor, autores);
    })
    
}

function salvarAutor(autor){
    console.log(autor)
    if(!autor.id_autor) {
        inserirAutor(autor, (erro,autor)=> {
            console.log(autor);
            carregarAutores();
            limparCampos()
        })    
    }
    else {
        atualizarAutor(autor.id_autor, autor, (erro, autor) => {
            console.log(autor);
            carregarAutores();
            limparCampos()
        })
    }
}

//Eventos
function onSalvar(autor){
    console.log("Autor: "+ autor);
    salvarAutor (autor)
    limparCampos()
}

function onCancelar(){
    carregarAutores();
}

function onDeletar(id_autor){
    console.log(id_autor)
    buscarPorLivrocomIdAutor(id_autor, (ausente, livros) => {
        if (ausente){
            deletarAutor(id_autor, (erro, autor) => {
                console.log(id_autor)
                alert(`Autor ${autor.nome} removido o com sucesso!`);
                carregarAutores();
            });
        }
        else{
            alert(`Não é possível deletar este Autor. Ele possui livros cadastrados!`);
            console.log(livros);
            carregarAutores();
        }
    });
}

function onEdit(id_autor){
    buscarAutor(id_autor, (erro, autor) => {
        console.log("Carregando Autor "+autor.nome);
        carregarForm(autor);
    });
}

