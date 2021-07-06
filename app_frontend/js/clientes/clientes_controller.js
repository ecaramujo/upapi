function iniciaClientes(){
    carregarClientes()
}

function carregarClientes() {
        buscarClientes((erro, clientes) => {
            console.log(clientes, clientes);
            renderTabela(clientes);
        })
}

function carregarForm(cliente){
    buscarClientes((erro, clientes) => {
        console.log(cliente, clientes);
        renderForm(cliente, clientes);
    })
    
}

function salvarCliente(cliente){
    console.log(cliente)
    if(!cliente.id_cliente) {
        inserirCliente(cliente, (erro,cliente)=> {
            console.log(cliente);
            carregarClientes();
        })    
    }
    else {
        atualizarCliente(cliente.id_cliente, cliente, (erro, cliente) => {
            console.log(cliente);
            carregarClientes();
        })
    }
}


/* function salvarCliente(cliente){
    buscarCliente(cliente.id_cliente, (erro, clienteantigo) => {
        console.log("passo6")
        if(cliente.matricula == clienteantigo.matricula){
            console.log("passo7")
            console.log("cliente matricula", cliente.matricula, "clienteantigo matricula", clienteantigo.matricula)
            atualizarCliente(cliente.id_cliente, cliente, (erro, cliente) => {
                console.log("passo8")
                console.log(cliente);
                carregarClientes();
            }) 
        }
        else{
            verificaMatricula(cliente)
        }
    }) 
}

 */

/* 
function verificaMatricula(cliente) {
    console.log("passo11")
    buscarClientes((erro, clientes) => {
        console.log("passo12")
        for(var i in clientes){
            console.log("passo13")
            console.log(clientes[i].matricula)
            console.log(cliente[0].matricula)
            if(clientes[i].matricula == cliente.matricula){
                console.log("passo14")
                alert(`Cliente ${cliente.nome} não pode ser cadastrado, a matrícula é repetida!`);
                carregarClientes();
            }
            
        }
        if(!cliente.id_cliente) {
            inserirCliente(cliente, (erro,cliente)=> {
                carregarClientes();
                limparCampos()
            })
        }
        else{
            atualizarCliente(cliente.id_cliente, cliente, (erro, cliente) => {
                console.log("passo10")
                console.log(cliente);
                carregarClientes();
            })
        }
    })
}

 */

//Eventos
function onSalvar(cliente){
    console.log("Cliente: ", cliente);
    salvarCliente (cliente);
    carregarClientes();
}

function onCancelar(){
    carregarClientes();
}

function onDeletar(id_cliente){
    buscarCliente(id_cliente, (erro, cliente) => {
        if(parseInt(cliente.locacao) >= 1){
            alert(`Cliente ${cliente.nome} não pode ser deletado pois possue entregas pendentes!`);
            carregarClientes();
        }
        else{
        deletarCliente(id_cliente, (erro, cliente) => {
            alert(`Cliente ${cliente.nome} removido o com sucesso!`);
            carregarClientes();
        })}
    });
};

function onEdit(id_cliente){
    buscarCliente(id_cliente, (erro, cliente) => {
        console.log("Carregando Cliente "+cliente.nome);
        carregarForm(cliente);
    });
}

function onSearch(nome){
    buscarPorNome(nome, (erro, clientes) => {
        if (erro){
            alert(`Cliente ${nome} não encontrado!`);
            carregarClientes();
        }
        else{
        console.log(clientes);
        renderTabela(clientes);
        }
    });
}



