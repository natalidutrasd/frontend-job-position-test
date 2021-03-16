let form = document.getElementById("login");
let submit = document.getElementById("btn-submit");

submit.addEventListener('click', function (e) {

    e.preventDefault();

    //pega o email via Id
    let email = document.getElementById('user').value;

    //pega o password via Id
    let password = document.getElementById('password').value;

    // se o usuário e senha são válidos (existente no localstorage)
    if (IsUserValid(email, password)) {

        // grava no localstorage o email do usuário logado
        localStorage.setItem('logged-user', email);

        // redireciona para a tela home
        window.location.href = window.location.href.replace('login.html', 'home.html');
    }else{
        // se inválido, ira apresentar um alerta 
        alert('Usuário e ou senha estão incorretos. Por favor verifique e tente novamente.')
    }
});

// método para imprimir mensagens de erro
function printMessage(input, msg) {

    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // imprimir erro só se não tiver erros
    if (errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }

}

function IsUserValid(email, password) {

    let users = JSON.parse(localStorage.getItem('users'));
    let isValid = false;

    if (!users) {
        alert('Não há usuários cadastrados, por gentileza crie seu usuário.')
        return false;

    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            isValid = true;
            break;
        }
    }

    return isValid;
}


function RedirectToRegister() {
    window.location.href = window.location.href.replace('login.html', 'register.html');
}

