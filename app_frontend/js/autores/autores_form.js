function renderForm(autor) {
    if(!autor) {
        autor =     {
            "nome": "",
            "pais_origem": "",
        };
    }
    var str = `
    <div class="container-sm rounded-3 border-3">
    
    <form id="formulario">
        <input type="hidden" id="id_autor"/>

    <div class="mb-3">
        <label for="txtnome" class="form-label">Nome: </label>
        <input type="text" class="form-control" value="${autor.nome}" id="txtnome">
    </div>

    <div class="mb-3">
        <label for="txtpais_origem" class="form-label">País de Origem: </label>
        <input type="text" class="form-control" value="${autor.pais_origem}" id="txtpais_origem">
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
        onSalvar(getDataAutor(autor));            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}

function getDataAutor(autor){
    autor.nome = document.querySelector("#txtnome").value;
    autor.pais_origem = document.querySelector("#txtpais_origem").value;
    return autor;
}

function limparCampos(){
    document.querySelector("#txtnome").value="";
    document.querySelector("#txtpais_origem").value="";
}