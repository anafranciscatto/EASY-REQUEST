// Função para o campo de CPF
document.getElementById('cpf').addEventListener('input', function (e) {
    let cpf = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço

    e.target.value = cpf;
});

// Função para o campo de SN
// Prefixo fixo
const prefixo = "SN";
const snInput = document.getElementById('sn');

// Adiciona o prefixo no campo quando o usuário clica no campo
snInput.addEventListener('focus', function(){
    if (snInput.value === '') {
        snInput.value = prefixo;
    }else{
        return;
    }
})

// Remove o prefixo no campo quando o usuário clica fora do campo
snInput.addEventListener('blur', function(){
    if (snInput.value === prefixo) {
        snInput.value = '';
    }else{
        return;
    }
})

// Adiciona o evento de input
snInput.addEventListener('input', function() {
    // Remove o prefixo para evitar duplicação
    let value = snInput.value.replace(prefixo, '');
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');
    // Limita a quantidade de números a 7
    value = value.substring(0, 7);
    // Atualiza o valor do input com o prefixo "SN" e os números digitados
    snInput.value = prefixo + value;
});

// Bloqueia o usuário de deletar o prefixo "SN"
snInput.addEventListener('keydown', function(e) {
    // Previne que o usuário apague o prefixo
    if (snInput.selectionStart < prefixo.length && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
    }
});

const cpf = document.getElementById('cpf');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const sn = document.getElementById('sn');
const foto = document.getElementById('foto');
const id_funcao = document.getElementById('funcao');
var permissao = '';

function cadastrar(){
    if (cpf.value === '' || nome.value === '' || email.value === '' || senha.value === '' || sn.value === '' || id_funcao.value === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Preencha todos os campos obrigatórios corretamente!",
            showConfirmButton: false,
            timer: 3500
          });
        return
    }else if((senha.value).length < 6){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "A senha deve ter pelo menos 6 caracteres",
            showConfirmButton: false,
            timer: 3500
          });
        return
    }

    var dados = new FormData(); // Cria um novo FormData

    // Adiciona os dados ao FormData
    dados.append('cpf', cpf.value);
    dados.append('nome', nome.value);
    dados.append('email', email.value);
    dados.append('senha', senha.value);
    dados.append('sn', sn.value);
    dados.append('foto', foto.files[0]); // Adiciona a foto
    dados.append('id_funcao', parseInt(id_funcao.value)); // Adiciona id_funcao

    $.ajax({
        url: '/cadastrar-usuario',
        type: 'POST',
        data: dados,
        contentType: false, // Importante para enviar arquivos
        processData: false, // Não processar os dados
        success: function(){
            if (parseInt(id_funcao.value) >= 2 && parseInt(id_funcao.value) <= 7){
                permissao = 'solicitante';
            }
            else if( parseInt(id_funcao.value) == 1){
                permissao = 'manutencao';
            }

            console.log(parseInt(id_funcao.value))
            console.log(permissao);


            if(permissao == 'manutencao'){
                window.location.href = '/RF006';
            }

            else if(permissao == 'solicitante'){
                window.location.href = '/tl-solicitante';
            }

        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao Cadastrar!",
                showConfirmButton: false,
                timer: 3500
              });
        }
    });
}

$(document).ready(function() {
    const senhaInput = $('#senha');
    const requisitos = {
        minLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialChar: false
    };

    const requisito1 = $('#requisito1');
    const requisito2 = $('#requisito2');
    const requisito3 = $('#requisito3');
    const requisito4 = $('#requisito4');
    const mensagem = $('#mensagem');

    senhaInput.on('focus', function() {
        $('#senha-requisitos').removeClass('hidden');
    });

    senhaInput.on('input', function() {
        const senha = senhaInput.val();
        requisitos.minLength = senha.length >= 6;
        requisitos.hasLetter = /[a-zA-Z]/.test(senha);
        requisitos.hasNumber = /\d/.test(senha);
        requisitos.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        // Atualiza os requisitos
        requisito1.toggleClass('validado', requisitos.minLength);
        requisito2.toggleClass('validado', requisitos.hasLetter);
        requisito3.toggleClass('validado', requisitos.hasNumber);
        requisito4.toggleClass('validado', requisitos.hasSpecialChar);

        // Verifica se todos os requisitos foram atendidos
        if (requisitos.minLength && requisitos.hasLetter && requisitos.hasNumber && requisitos.hasSpecialChar) {
            // Limpa os outros textos e mostra apenas a mensagem de validação
            requisito1.addClass('hidden');
            requisito2.addClass('hidden');
            requisito3.addClass('hidden');
            requisito4.addClass('hidden');
            mensagem.removeClass('hidden').text('Senha validada');
        } else {
            // Restaura os textos dos requisitos se a senha não for válida
            mensagem.addClass('hidden');
            requisito1.removeClass('hidden');
            requisito2.removeClass('hidden');
            requisito3.removeClass('hidden');
            requisito4.removeClass('hidden');
        }
    });
});
