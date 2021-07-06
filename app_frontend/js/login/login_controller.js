function iniciaLogin(){
    carregarForm()
}

function carregarForm() {
    renderForm();
}  

//Eventos
function onLogin(usuario){
    validarUsuario(usuario, (erro, token) => {
        // Store
        sessionStorage.setItem("key", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTYyNTQzNTYwMCwiZXhwIjoxNjI1NDM5MjAwfQ.BQHeeRs1WvJKPgDp-MvLqD3UN1j5-nL6NJ7j-hn8WWE");
        carregarForm()
    })
}

/* function returnValue(token){
    const auth = {}
    JSON.stringify(token)
    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTYyNTM2NzIxOCwiZXhwIjoxNjI1MzcwODE4fQ.BknG7HRQC9HOp70zQFe_WZo2v5WyHjBwiLTkj-z_rbM"}

} */

function onCancelar(){
    sessionStorage.clear();
    carregarForm();
}


