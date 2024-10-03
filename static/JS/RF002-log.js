const sn = document.getElementById('sn');
const senha = document.getElementById('senha');
var permissao = '';

function logar(){
    var dados = {
        sn:sn.value,
        senha:senha.value
    }

    $.ajax({
        url: '/realizar-login',
        type: 'POST',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function(dados){
            console.log(dados)
            // if (parseInt(funcao.value) >= 2 && parseInt(funcao.value) <= 7){
            //     permissao = 'solicitante';
            // }
            // else if( parseInt(funcao.value) == 1){
            //     permissao = 'manutencao';
            // }

            // console.log(parseInt(funcao.value))
            // console.log(permissao);


            // if(permissao == 'manutencao'){
            //     window.location.href = '/RF006';
            // }

            // else if(permissao == 'solicitante'){
            //     window.location.href = '/RF003';
            // }

        },
        error: function(){
            swal ( "Oops!" ,  "O envio deu errado!" ,  "error" );
        }
    })
}