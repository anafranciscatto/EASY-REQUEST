// // Adiciona um evento para executar o código assim que o conteúdo do DOM estiver completamente carregado
// document.addEventListener('DOMContentLoaded', function () {

//     // Seleciona o elemento de dropdown de seleção de profissão
//     const profissao = document.querySelector('.form-container__select');
    
//     // Seleciona as imagens para manutenção e solicitante
//     const imgMan = document.querySelector('#img-man');
//     const imgSoli = document.querySelector('#img-soli');

//     // Função para atualizar a visibilidade das imagens com base na seleção do dropdown
//     function updateImages() {
//         // Obtém o valor selecionado no dropdown
//         const selectedValue = profissao.value;

//         // Mostra ambas as imagens inicialmente
//         imgMan.classList.remove('hidden');
//         imgSoli.classList.remove('hidden');

//         // Oculta a imagem que não corresponde à seleção
//         if (selectedValue === 'manutencao') {
//             imgSoli.classList.add('hidden'); // Oculta a imagem do solicitante se "Manutenção" for selecionado
//         } else if (selectedValue === 'solicitante') {
//             imgMan.classList.add('hidden'); // Oculta a imagem da manutenção se "Solicitante" for selecionado
//         }
//     }

//     // Inicializa a visibilidade das imagens com base na seleção inicial do dropdown
//     updateImages();

//     // Adiciona um evento que chama a função updateImages sempre que o valor do dropdown mudar
//     profissao.addEventListener('change', updateImages);
// });

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
    })
}

// cpf = request.form["cpf"]
// nome = request.form["nome"]
// email = request.form["email"]
// senha = request.form["senha"]
// sn = request.form["sn"]
// foto = request.form["foto"]
// id_funcao = int(request.form["funcao"])

