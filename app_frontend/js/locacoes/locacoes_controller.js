function iniciaLocacoes(){
    carregarLocacoes()
}

function carregarLocacoes() {
    buscarLivros((erro, livros) => {
        buscarLocacoes((erro, locacoes) => {
            buscarClientes((erro, clientes) => {
                console.log(locacoes, clientes, livros);
                renderTabela(locacoes, clientes, livros);
            })
        })
    })
}   

function carregarForm(locacao) {
    buscarLivros((erro, livros) => {
        buscarClientes((erro, clientes) => {
            console.log(clientes, livros);
            renderForm(locacao, clientes, livros);
        })
    })
}  


function salvarLocacao(locacao){
    inserirLocacao(locacao, (erro,locacao)=> {
        console.log(locacao);
        carregarLocacoes();
        limparCampos();
    })    
}

//Eventos
function onSalvar(locacao){
    console.log(locacao);
    buscarCliente((locacao.id_cliente), (erro, cliente) => {
        buscarLivro((locacao.id_livro), (erro, livro) => {
            console.log("Locacao: "+ locacao, cliente, livro);
            if(cliente.locacao == "3"){
                alert(`A locação não pode ser concluída. Cliente ${cliente.nome} Já atingiu o máximo de 3 locações!`);
                carregarLocacoes();
                limparCampos();
            }
            else if(livro.quantidade == "0"){
                alert(`A locação não pode ser concluída. Livro ${livro.nome} não possui mais cópias!`);
                carregarLocacoes();
                limparCampos();
            }
            else{
                salvarLocacao (locacao);
                limparCampos();
            }
        })
    })    
}

function onCancelar(){
    carregarLocacoes();
    
}

function onDeletar(id_locacao){
    deletarLocacao(id_locacao, (erro, locacao) => {
        alert(`Locacao ${locacao.nome} removido o com sucesso!`);
        carregarLocacoes();
    });
}

function onEdit(id_locacao){
    console.log(id_locacao);
    buscarLocacao(id_locacao, (erro, locacao) => {
        console.log(locacao);
        devolverLocacao(id_locacao, locacao, (erro, locacao) => {
            console.log(locacao)
            carregarLocacoes();
        })
    });
}

function onSearch(nome){
    buscarPorNome(nome, (erro, cliente) => {
        if (erro){
            alert(`Cliente ${nome} não encontrado!`);
            carregarLocacoes();
        }
        else{
            buscarPorid_cliente((cliente[0].id_cliente), (erro, locacoes) => {
                console.log(locacoes);
                buscarLivros((erro, livros) => {
                        buscarClientes((erro, clientes) => {
                            renderTabela(locacoes, clientes, livros);
                        });
                    });
            });
        }
    });
}



