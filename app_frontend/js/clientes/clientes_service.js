const URI = "http://localhost:3000/api/clientes";

function buscarClientes(callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                try {
                    callback(null, JSON.parse(this.responseText));
                } catch(msg){
                    const erro = {
                        status: 0,
                        msg: msg
                    }    
                    callback(erro, null);
                }
            }
            else {
                const erro = {
                    status: this.status,
                    msg: this.responseText
                }
                callback(erro, null);
            }
        }
    };
    xhttp.open("GET", URI, true);
    xhttp.send();
}

function buscarPorNome(nome, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                try {
                    callback(null, JSON.parse(this.responseText));
                } catch(msg){
                    const erro = {
                        status: 0,
                        msg: msg
                    }
                    console.log(erro.msg);    
                    callback(erro, null);
                }
            }
            else {
                const erro = {
                    status: this.status,
                    msg: this.responseText
                }
                callback(erro, null);
            }
        }
    };
    xhttp.open("GET", URI+"/nome?nome="+nome, true);
    xhttp.send();
}

function inserirCliente(cliente, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 201) {
                console.log(this.responseText) 
                callback(null, this.responseText)
            }
            else {
                const erro = {
                    status: this.status,
                    msg: this.responseText
                }
                callback(erro, null);
            }
        }
    };
    xhttp.open("POST", URI, true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(cliente));
}

function deletarCliente(id_cliente, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                try {
                    callback(null, JSON.parse(this.responseText));
                } catch(msg){
                    const erro = {
                        status: 0,
                        msg: msg
                    }    
                    callback(erro, null);
                }
            }
            else {
                const erro = {
                    status: this.status,
                    msg: this.responseText
                }
                callback(erro, null);
            }
        }
    };
    xhttp.open("DELETE", URI+"/"+id_cliente, true);
    xhttp.send();

}

function buscarCliente(id_cliente, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                try {
                    callback(null, JSON.parse(this.responseText));
                } catch(msg){
                    const erro = {
                        status: 0,
                        msg: msg
                    }
                    console.log(erro.msg);    
                    callback(erro, null);
                }
            }
            else {
                const erro = {
                    status: this.status,
                    msg: this.responseText
                }
                callback(erro, null);
            }
        }
    };
    xhttp.open("GET", URI+"/"+id_cliente, true);
    xhttp.send();
}

function atualizarCliente(id_cliente, cliente, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                console.log(this.responseText) 
                callback(null, this.responseText)
            }
            else {
                const erro = {
                    status: this.status,
                    msg: this.responseText
                }
                callback(erro, null);
            }
        }
    };
    xhttp.open("PUT", URI+"/"+id_cliente, true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(cliente));
}
