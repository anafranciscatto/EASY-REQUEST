// Função para o campo de SN
// Prefixo fixo
const prefixo = "SN";
const snInput = document.getElementById('inp-SN');

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

const sn = document.getElementById('inp-SN');
const senha = document.getElementById('inp-senha');
var permissao = '';

function logar(){
    if (sn.value == '' || senha.value == '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "SN ou senha não podem estar vázios!",
            showConfirmButton: false,
            timer: 3500
          });
          return;
    }
    var dados = {
        sn:sn.value,
        senha:senha.value
    }

    $.ajax({
        url: '/realizar-login',
        type: 'POST',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function(dados_login){
            if(dados_login['permissao'] == 'administrador'){
                window.location.href = '/tl-administrador';
            }

            else if(dados_login['permissao'] == 'manutencao'){
                window.location.href = '/RF006';
            }

            else if(dados_login['permissao'] == 'solicitante'){
                window.location.href = '/tl-solicitante';
            }
            console.log(dados_login["permissao"])
        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "SN ou senha inválidos!",
                showConfirmButton: false,
                timer: 3500
              });
        }
    })
}