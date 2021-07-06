function renderForm(locacao, clientes, livros) {
    if(!locacao) {
        locacao =     {
            "id_cliente": "",
            "id_livro": "",
        };
    }
    var str = `
    <div class="container-sm rounded-3 border-3">

    <form id="formulario">
        <input type="hidden" id="id_locacao"/>

    <div class="mb-3">
        <label for="txtid_cliente" class="form-label">Nome do Cliente: </label>
        <select type="text" class="form-select" aria-label="Default select example" id="txtid_cliente">
        `
        for(var y in clientes){
            str+=`<option value="${clientes[y].id_cliente}">${clientes[y].nome}</option>`
        }
    str+=`</select>
    </div>

    <div class="mb-3">
        <label for="txtid_livro" class="form-label">Nome do Livro: </label>
        <select type="text" class="form-select" aria-label="Default select example" id="txtid_livro">
        `
        for(var x in livros){
            str+=`<option value="${livros[x].id_livro}">${livros[x].nome}</option>`
        }
    str+=`</select>
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
        onSalvar(getDataLocacao(locacao));            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}

function getDataLocacao(locacao){
    locacao.id_cliente = document.querySelector("#txtid_cliente").value;
    locacao.id_livro = document.querySelector("#txtid_livro").value;
    return locacao;
}

function limparCampos(){
    document.querySelector("#txtid_cliente").value="";
    document.querySelector("#txtid_livro").value="";
}