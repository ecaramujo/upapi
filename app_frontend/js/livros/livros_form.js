function renderForm(livro, autores) {
    if(!livro) {
        livro =     {
            "isbn": "",
            "nome": "",
            "id_autor": "",
            "editora": "",
            "ano": "",
            "quantidade": ""
        };
    }

    var str = `
    <div class="container-sm rounded-3 border-3">
    
    <form id="formulario">
        <input type="hidden" id="id_livro"/>

    <div class="mb-3">
        <label for="txtisbn" class="form-label">ISBN</label>
        <input type="text" class="form-control" value="${livro.isbn}" id="txtisbn">
    </div>

    <div class="mb-3">
        <label for="txtnome" class="form-label">Nome: </label>
        <input type="text" class="form-control" value="${livro.nome}" id="txtnome">
    </div>


    <div class="mb-3">
        <label for="txtid_autor" class="form-label">Nome do Autor: </label>
        <select type="text" class="form-select" aria-label="Default select example" id="txtid_autor">
        `
        for(var y in autores){
            str+=`<option value="${autores[y].id_autor}">${autores[y].nome}</option>`
        }
    str+=`</select>
    </div>


    <div class="mb-3">
        <label for="txteditora" class="form-label">Editora</label>
        <input type="text" class="form-control" value="${livro.editora}" id="txteditora">
    </div>

    <div class="mb-3">
        <label for="txtano" class="form-label">Ano</label>
        <input type="text" class="form-control" value="${livro.ano}" id="txtano">
    </div>

    <div class="mb-3">
        <label for="txtquantidade" class="form-label">Quantidade</label>
        <input type="text" class="form-control" value="${livro.quantidade}" id="txtquantidade">
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
    <button type="submit" class="btn btn-dark" id="btnsalvar">Salvar</button>
    <button type="reset" class="btn btn-danger">Cancelar</button>
    </div>

    </form>
    </div>
    `;

    let containerForm = document.querySelector("main");
    containerForm.innerHTML = str;

    var form = document.querySelector("#formulario");

    form.onsubmit = function(event){
        event.preventDefault();
        onSalvar(getDataLivro(livro));            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}

function getDataLivro(livro){
    livro.isbn = document.querySelector("#txtisbn").value;
    livro.nome = document.querySelector("#txtnome").value;
    livro.id_autor = document.querySelector("#txtid_autor").value;
    livro.editora = document.querySelector("#txteditora").value;
    livro.ano = document.querySelector("#txtano").value;
    livro.quantidade = document.querySelector("#txtquantidade").value;
    return livro;
}

function limparCampos(){
    document.querySelector("#txtisbn").value="";
    document.querySelector("#txtnome").value="";
    document.querySelector("#txtid_autor").value="";
    document.querySelector("#txteditora").value="";
    document.querySelector("#txtano").value="";
    document.querySelector("#txtquantidade").value="";
}