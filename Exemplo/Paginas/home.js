var home = document.getElementById('home-page');
var tabela = document.getElementById('name_list');

localStorage.setItem('names', JSON.stringify([]));

// Criar
function Add() {
    let element = document.getElementById('name');

    if (element.value) {
        AddName(element.value);
        ListAll();

        element.value = '';
    }
};

// Ler
function ListAll() {
    let names = GetNames();
    let rows = '';

    if (names.length > 0) {
        for (i = 0; i < names.length; i++) {
            rows += '<tr>';
            rows += '<td>' + names[i] + '</td>';
            rows += '<td colspan="2"><button class="btn" id="btn-warning" style="width:50px; height:20px;" onclick="Edit(' + i + ')"><span></span> Editar</button> | <button class="btn" id="btn-danger" style="width:50px; height:20px;" onclick="Delete(' + i + ')">Excluir</button></td>';
            rows += '</tr>';
        }
    }

    tabela.innerHTML = rows;
};

// Atualizar
function Edit(index) {
    let name = GetName(index);

    if (name) {

        let element = document.getElementById('edit-name');
        element.value = name;

        document.getElementById('edit').style.display = 'block';
        document.getElementById('update').onsubmit = function () {

            if (element.value) {
                UpdateName(index, element.value.trim());
                ListAll();

                document.getElementById('edit').style.display = 'none'
            }
        }
    }
};

// Apagar
function Delete(index) {
    RemoveName(index);
    ListAll();
};


/* Interação com o  LocalStorage */

// Criae
function AddName(newName) {
    let names = GetNames();
    names.push(newName);

    localStorage.setItem('names', JSON.stringify(names));
}

// Ler
function GetNames() {
    return JSON.parse(localStorage.getItem('names'));
}

// Atualizar
function UpdateName(index, newName) {
    let names = GetNames();
    names.splice(index, 1, newName);

    localStorage.setItem('names', JSON.stringify(names));
}

// Apagar
function RemoveName(index) {
    let names = GetNames();
    names.splice(index, 1);

    localStorage.setItem('names', JSON.stringify(names));
}

// Get by Index
function GetName(index) {
    let names = GetNames();
    return names[index];
}

/* Termina a interação com o  LocalStorage */

/*  Login */

function LoadUser() {

    // recupera do localostorage o usuário logado
    let user = localStorage.getItem('logged-user');

    // se tem usuário logado, apresenta o nome no navbar
    if (user) {
        let span = document.getElementById('username');
        span.innerText = user;
    }else{
        // se não estiver logado, apresenta mensagem
        alert('Voce precisa estar logado para prosseguir.');

        // aguarda 3 segundos ate redirecionar para a tela de login
        setTimeout(function(){
            window.location.href = window.location.href.replace('home.html', 'login.html');
        }, 3000);
    }
}

function Logout() {
    localStorage.removeItem('logged-user');
    window.location.href = window.location.href.replace('home.html', 'login.html');
}
LoadUser();
