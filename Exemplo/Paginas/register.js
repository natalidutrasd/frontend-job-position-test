class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }

    //inicia a validação de todos os campos
    validate(form) {

        let isFormValid = true;

        // limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        //pega os inputs
        let inputs = form.getElementsByTagName('input');

        // transforma HTMLCollection em arr
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante aos atributos encontrados
        inputsArray.forEach(function (input, obj) {

            // fazer validação de acordo com o atributo do input
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    // limpa string para saber o método
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // valor do input
                    let value = input.getAttribute(this.validations[i])

                    // chama o método
                    let isValid = this[method](input, value);

                    if (!isValid)
                        isFormValid = isValid;
                }
            }

        }, this);

        return isFormValid;
    }

    // validar se tem um mínimo de caracteres
    minlength(input, minValue) {

        if (input.value.length < minValue) {
            this.printMessage(input, `O campo precisa ter pelo menos ${minValue} caracteres`);
            return false;
        }

        return true;
    }

    // validar se passou do máximo de caracteres
    maxlength(input, maxValue) {

        if (input.value.length > maxValue) {
            this.printMessage(input, `O campo precisa ter menos que ${maxValue} caracteres`);
            return false;
        }
        return true;
    }

    // validar strings que só contem letras
    onlyletters(input) {

        // usa regex para validar se contem letras
        let re = /^[A-Za-z]+$/;;

        if (!re.test(input.value)) {
            this.printMessage(input, `Este campo não aceita números nem caracteres especiais`);
            return false;
        }

        return true;
    }

    // valida o  e-mail
    emailvalidate(input) {

        // usa regex para validacao de email
        let re = /\S+@\S+\.\S+/;

        if (!re.test(input.value)) {
            this.printMessage(input, `Insira um e-mail no padrão natali@email.com`);
            return false;
        }

        return true;
    }

    // verifica se um campo está igual o outro
    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];

        if (input.value != inputToCompare.value) {
            this.printMessage(input, `Este campo precisa estar igual ao ${inputName}`);
            return false;
        }

        return true;
    }

    // exibir os inputs que são obrigatórios
    required(input) {

        let inputValue = input.value;

        if (inputValue === '') {
            this.printMessage(input, `Este campo é obrigatório`);
            return false;
        }

        return true;
    }

    // validando o campo de senha
    passwordvalidate(input) {

        // explodir string em array
        let charArr = input.value.split("");
        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            this.printMessage(input, `A senha precisa um caractere maiúsculo e um número`);
            return false;
        }

        return true;
    }

    // imprimir mensagens de erro
    printMessage(input, msg) {

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

    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("cadastro-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

//evento que dispara as validações
submit.addEventListener('click', function (e) {

    e.preventDefault();

    // valida se o formulario atende todas as requisições (nome, email, senha (maiúscula, minúscula, etc...))
    if (validator.validate(form)) {

        // recupera o array de usuários do localstorage (JSON String) e desconverte de string para objeto javascript (Array)
        let usersStorage = JSON.parse(localStorage.getItem('users'));
        
        // se nenhum usuário registrado (undefined), inicia array para armazenar primeiro usuário
        if (!usersStorage) usersStorage = [];

        // adiciona o usuario cadsatrado no array de usuários
        usersStorage.push({
            email: form.email.value,
            password: form.password[0].value
        });

        // converte o objeto complexo javascript em json (string) e salva no localstorage
        localStorage.setItem('users', JSON.stringify(usersStorage));
        
        // apresenta a mensagem de cadastro com sucesso
        document.getElementById('successful').style.display = 'block';

        // espera 3 segundos para redirecionar para a tela de login
        setTimeout(function(){
            window.location.href = window.location.href.replace('register.html', 'login.html');
        }, 3000);
    }
});

