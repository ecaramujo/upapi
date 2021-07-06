function renderTabela(autores){
    var str=`
    <div class="container-md rounded-3 border-3">
    
    <div id="tabela">
    <table class="table table-striped">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Id</th>
    <th scope="col">Nome</th>
    <th scope="col">País de Origem</th>
    <th scope="col" colspan="2"></th>
    </tr>
    </thead>
    <tbody>`;
    for(var i in autores){
        str+=`<tr>
                <th scope="row">${i}</th>
                <td>${autores[i].id_autor}</td>
                <td>${autores[i].nome}</td>
                <td>${autores[i].pais_origem}</td>
                <td><button type="button" class="edit btn btn-secondary" data-id_autor="${autores[i].id_autor}">Editar</button></td>
                <td><button type="button" class="delete btn btn-danger" data-id_autor="${autores[i].id_autor}">Deletar</button></td>
            </tr>`;
    } 
    str+= `
    </table>
    <div class="d-grid gap-2 col-6 mx-auto">
    <button id='novo' type="button" class="btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/></svg> Inserir Autor</button></div>
    </div>
    </div>`
    ;

    var tabela = document.querySelector("main");
    tabela.innerHTML = str;

    var linkNovo = document.querySelector("#novo");
    linkNovo.onclick = function(event){
        carregarForm();
    }

    const linksEdit = document.querySelectorAll(".edit");
    for(let linkEdit of linksEdit) {
        linkEdit.onclick = function(event){
            onEdit(event.target.getAttribute("data-id_autor"));
        }
    }

    const linksDelete = document.querySelectorAll(".delete");
    for(let linkDelete of linksDelete) {
        linkDelete.onclick = function(event){
            onDeletar(event.target.getAttribute("data-id_autor"));
        }
    }
}
