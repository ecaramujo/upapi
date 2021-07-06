function renderForm(cliente) {
    if(!cliente) {
        cliente =     {
            "matricula": "",
            "nome": "",
            "telefone": "xxxxxxxxxx",
        };
    }
    var str = `
    <div class="container-sm rounded-3 border-3">
    
    <form id="formulario">
        <input type="hidden" id="id_cliente"/>

    <div class="mb-3">
        <label for="txtmatricula" class="form-label">Matrícula: </label>
        <input type="text" class="form-control" value="${cliente.matricula}" id="txtmatricula">
    </div>

    <div class="mb-3">
        <label for="txtnome" class="form-label">Nome: </label>
        <input type="text" class="form-control" value="${cliente.nome}" id="txtnome">
    </div>

    <div class="mb-3">
        <label for="txttelefone" class="form-label">Telefone: </label>
        <input type="text" class="form-control" value="(${cliente.telefone.substr(0, 2)})-${cliente.telefone.substr(2, 4)}-${cliente.telefone.substr(6)}" id="txttelefone">
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
        onSalvar(getDataCliente(cliente));            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}







function getDataCliente(cliente){
    cliente.matricula = document.querySelector("#txtmatricula").value;
    cliente.nome = document.querySelector("#txtnome").value;
    var telefone = document.querySelector("#txttelefone").value.replaceAll('-', '');
    telefone = telefone.replaceAll(')', '');
    cliente.telefone = telefone.replaceAll('(', '');
    console.log("**********************", cliente);
    return cliente;
}


function limparCampos(){
    document.querySelector("#txtmatricula").value="";
    document.querySelector("#txtnome").value="";
    document.querySelector("#txttelefone").value="";
}