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

const cpf = document.getElementById('cpf');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const sn = document.getElementById('sn');
const foto = document.getElementById('foto');
const id_funcao = document.getElementById('funcao');
const permissao = '';

function cadastrar(){
    var dados = {
        cpf:cpf.value,
        nome:nome.value,
        email:email.value,
        senha:senha.value,
        sn:sn.value,
        foto:foto.value,
        id_funcao:parseInt(funcao.value)
    }

    $.ajax({
        url: '/cadastrar-usuario',
        type: 'POST',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function(){
            if (parseInt(id_funcao.value) >= 2 && parseInt(id_funcao.value) <= 7){
                permissao = 'solicitante';
            }
            else if( parseInt(id_funcao.value) == 1){
                permissao = 'manutencao';
            }

            if(permissao == "manutencao"){
                window.location.href = '/RF006';
            }

            else if(permissao == "solicitante"){
                window.location.href = '/RF003';
            }

        },
        error: function(){
            swal ( "Oops!" ,  "O envio deu errado!" ,  "error" );
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

