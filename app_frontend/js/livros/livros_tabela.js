function renderTabela(livros, autores){
    var str=`
    <div class="container-md rounded-3 border-3">
    
    <div id="tabela">
    <table class="table table-striped">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Id</th>
    <th scope="col">ISBN</th>
    <th scope="col">Nome</th>
    <th scope="col">Autor</th>
    <th scope="col">Editora</th>
    <th scope="col">Ano</th>
    <th scope="col">Quantidade</th>
    <th scope="col" colspan="2"></th>
    </tr>
    </thead>
    <tbody>`;
    for(var i in livros){
        var disponibilidade =  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg text-success" viewBox="0 0 16 16"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg>'
        if (livros[i].quantidade == "0") {
            var disponibilidade = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg>'
        }
        for(var x in autores){
            if (livros[i].id_autor === autores[x].id_autor) {
                var nomedoautor = autores[x].nome
            }
        }
        str+=`<tr>
                <th scope="row">${i}</th>
                <td>${livros[i].id_livro}</td>
                <td>${livros[i].isbn}</td>
                <td>${livros[i].nome}</td>
                <td>${nomedoautor}</td>
                <td>${livros[i].editora}</td>
                <td>${livros[i].ano}</td>
                <td>${disponibilidade} ${livros[i].quantidade}</td>
                <td><button type="button" class="edit btn btn-secondary" data-id_livro="${livros[i].id_livro}">Editar</button></td>
                <td><button type="button" class="delete btn btn-danger" data-id_livro="${livros[i].id_livro}">Deletar</button></td>
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
        <input type="text" id="inputSearch" class="form-control" placeholder="Digite o nome do livro"> 
    </div>
    <button id='pesquisa' type="button" class="col-auto btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></button></div></div>
    <div class="col-4"><div class="col-auto"><button id='novo' type="button" class="col-auto btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
    </svg> Inserir Livro</button></div></div>
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
            onEdit(event.target.getAttribute("data-id_livro"));
        }
    }

    const linksDelete = document.querySelectorAll(".delete");
    for(let linkDelete of linksDelete) {
        linkDelete.onclick = function(event){
            onDeletar(event.target.getAttribute("data-id_livro"));
        }
    }
}
