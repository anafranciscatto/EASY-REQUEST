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
            if(dados_login['permissao'] == 'administrador'){
                window.location.href = '/tl-administrador';
            }

            else if(dados_login['permissao'] == 'manutencao'){
                window.location.href = '/RF003';
            }

            else if(dados_login['permissao'] == 'solicitante'){
                window.location.href = '/RF003';
            }
            console.log(dados_login["permissao"])
        },
        error: function(){
            swal("Oops!" , "SN ou senha inválidos!" , "error" );
        }
    })
}