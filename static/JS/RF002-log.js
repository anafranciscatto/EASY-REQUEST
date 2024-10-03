const sn = document.getElementById('inp-SN');
const senha = document.getElementById('inp-senha');
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
        success: function(dados_login){
            console.log(dados_login)
        },
        error: function(){
            swal("Oops!" , "O envio deu errado!" , "error" );
        }
    })
}
            // if (parseInt(funcao.value) >= 2 && parseInt(funcao.value) <= 7){
            //     permissao = 'solicitante';
            // }
            // else if( parseInt(funcao.value) == 1){
            //     permissao = 'manutencao';
            // }

            // console.log(parseInt(funcao.value))
            // console.log(permissao);

            // if(permissao == 'administrador'){
            //     window.location.href = '/RF006';
            // }

            // else if(permissao == 'manutencao'){
            //     window.location.href = '/RF003';
            // }

            // else if(permissao == 'solicitante'){
            //     window.location.href = '/RF003';
            // }