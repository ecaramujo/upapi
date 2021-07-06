function dataContrario(data) {
    var res = data.split("-");
    var contrario = (res[2]+"/"+res[1]+"/"+res[0])
    return contrario
}

function renderTabela(locacoes, clientes, livros){
    var str=`
    <div class="container-md rounded-3 border-3">
    
    <div id="tabela">
    <table class="table table-striped">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Id</th>
    <th scope="col">Locações | Cliente </th>
    <th scope="col">Unidades | Livro</th>
    <th scope="col">Data Retirada</th>
    <th scope="col">Data de Entrega</th>
    <th scope="col">Data da Devolução</th>
    <th scope="col">Status</th>
    <th scope="col" colspan="1"></th>
    </tr>
    </thead>
    <tbody>`;
    for(var i = locacoes.length - 1; i >= 0; i--){
        for(var x in clientes){
            if (locacoes[i].id_cliente === clientes[x].id_cliente) {
                var nomedocliente = "<b>|</b> "+clientes[x].nome
                var locacaodocliente = clientes[x].locacao
                if(locacaodocliente == "3"){
                    var corlocacaodocliente = "danger"
                }
                else{
                    var corlocacaodocliente = "success"
                }
                break
            }
            else{
                var nomedocliente = "<b>Deletado</b>"
                var locacaodocliente = ""
                var corlocacaodocliente = "danger"
            }
        }
        for(var y in livros){
            if (locacoes[i].id_livro === livros[y].id_livro) {
                var nomedolivro = "<b>|</b> "+livros[y].nome
                var quantidadedolivro = livros[y].quantidade
                if(quantidadedolivro == "0"){
                    var corquantidadedolivro = "danger"
                }
                else{
                    var corquantidadedolivro = "success"
                }
                break
            }
            else{
                var nomedolivro = "<b>Deletado</b>"
                var quantidadedolivro = ""
                var corquantidadedolivro = "danger"
            }
        }
        if(!locacoes[i].data_real_entrega) {
            var dataentrega = "xx/xx/xxxx"
            }
        else{
            dataentrega = "<b>"+dataContrario(locacoes[i].data_real_entrega.substr(0, 10))+"</b>"
            if (locacoes[i].data_estimada_entrega > locacoes[i].data_real_entrega){
                var cordevolucao = "success" 
            }
            else{
                var cordevolucao = "danger"
            }
            
        };
        var status =  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg text-success" viewBox="0 0 16 16"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg>'
        if (locacoes[i].status === "Aguardando Devolução") {
            var status = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg>'
        }
        str+=`<tr>
                <th scope="row">${i}</th>
                <td>${locacoes[i].id_locacao}</td>
                <td> <b class="text-${corlocacaodocliente}">${locacaodocliente}</b>  ${nomedocliente}</td>
                <td> <b class="text-${corquantidadedolivro}">${quantidadedolivro}</b>  ${nomedolivro}</td>
                <td>${dataContrario(locacoes[i].data_retirada.substr(0, 10))}</td>
                <td>${dataContrario(locacoes[i].data_estimada_entrega.substr(0, 10))}</td>
                <td class="text-${cordevolucao}">${dataentrega}</td>
                <td>${status} ${locacoes[i].status}</td>
                <td>`
                if (locacoes[i].status === "Aguardando Devolução") {
                    str+=`<button type="button" class="edit btn btn-success" data-id_locacao="${locacoes[i].id_locacao}">Devolver</button>`
                    }
                str+=`</td>
            </tr>`;
    } 
    str+= `
    </table>
    <div class="container">
    <div class="row">
    <div class="col-8">
    <div class="row g-3 align-items-center">
    <div class="col-auto">
        <label for="pesquisar" class="col-form-label">Pesquisar</label>
        </div>
        <div class="col-6 align-items-left">
        <input type="text" id="inputSearch" class="form-control" placeholder="Digite o nome do cliente"> 
    </div>
    <button id='pesquisa' type="button" class="col-auto btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></button></div></div>
    <div class="col-4"><div class="col-auto"><button id='novo' type="button" class="col-auto btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/></svg>   Nova Locação</button></div></div>
    </div>
    </div>`
    ;

    var tabela = document.querySelector("main");
    tabela.innerHTML = str;

    var linkNovo = document.querySelector("#novo");
    linkNovo.onclick = function(event){
        carregarForm();
    }

    var linkSearch = document.querySelector("#inputSearch");
    pesquisa.onclick = function(event){
        onSearch(document.querySelector("#inputSearch").value);
    }

    const linksEdit = document.querySelectorAll(".edit");
    for(let linkEdit of linksEdit) {
        linkEdit.onclick = function(event){
            onEdit(event.target.getAttribute("data-id_locacao"));
        }
    }

    const linksDelete = document.querySelectorAll(".delete");
    for(let linkDelete of linksDelete) {
        linkDelete.onclick = function(event){
            onDeletar(event.target.getAttribute("data-id_locacao"));
        }
    }
}

