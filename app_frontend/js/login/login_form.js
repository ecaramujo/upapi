function renderForm() {
    var str=`
    <div class="container-sm rounded-3 border-3">
    <form id="formulario" class="container-sm">

    <h2><img src="img/bem.png">Bem-vindo</h2>
    <input type="hidden" id="id_usuario"/>

    <div class="mb-3">
        <label for="txtusername" class="form-label" >Login</label>
        <input type="text" class="form-control" placeholder="api@biblioteca.com" id="txtusername">
    </div>

    <div class="mb-3">
        <label for="txtpassword" class="form-label">Senha</label>
        <input type="password" class="form-control" id="txtpassword" placeholder="****************">
    </div>

    <div class="d-grid gap-2 col-6 mx-auto">
        <button type="submit" class="btn btn-primary" id="btnsalvar">Login</button>
        <button type="reset" class="btn btn-dark">Cancelar</button>
    </div>
    </form>
    </div>
    `;

    let containerForm = document.querySelector("main");
    containerForm.innerHTML = str;

    var form = document.querySelector("#formulario");

    form.onsubmit = function(event){
        event.preventDefault();
        onLogin(getDataUsuario());            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}

function getDataUsuario(){
    usuario ={};
    usuario.username = document.querySelector("#txtusername").value;
    usuario.password = document.querySelector("#txtpassword").value;
    return usuario;
}

function limparCampos(){
    document.querySelector("#txtusername").value="";
    document.querySelector("#txtpassword").value="";
}