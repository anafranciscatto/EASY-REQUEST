function retornaEncaminhamentos() {
  $.ajax({
    url: '/retorna-encaminhamentos',
    type: 'GET',
    success: function(encaminhamentos){
        console.log("Encaminhamentos Fazendo:")
        console.log(encaminhamentos[0])
        console.log("Encaminhamento Pendentes:")
        console.log(encaminhamentos[1])

        encaminhamentos_fazendo = encaminhamentos[0]
        encaminhamentos_pendentes = encaminhamentos[1]
        document.getElementById('encaminhamentos_fazendo').innerHTML = '';
        document.getElementById('encaminhamentos_pendentes').innerHTML = '';
        for (let x = 0; x < encaminhamentos_fazendo.length; x++) {
          var infoEncaminhamentosFazendo = `<div class="ladoEsquerdo-card">
                        <p class="horario">10:30am</p>
                        <div class="card-conteudo">
                            <p class="bloco">${encaminhamentos_fazendo[x][1]} | ${encaminhamentos_fazendo[x][0]}</p>
                            <p class="urgencia">${encaminhamentos_fazendo[x][2]}</p>
                            <a href="/RF007/${encaminhamentos_fazendo[x][4]}"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>`;
            document.getElementById('encaminhamentos_fazendo').innerHTML += infoEncaminhamentosFazendo;
        }

        for (let x = 0; x < encaminhamentos_pendentes.length; x++) {
          var infoEncaminhamentosPendentes = `<a href="/RF006A/${encaminhamentos_pendentes[x][3]}/${encaminhamentos_pendentes[x][4]}">
                        <div class="servico-encaminhado">
                            <div class="servico-encaminhado-data">
                                <p class="servico-encaminhado-dia-semana">QUI</p><p class="servico-encaminhado-dia">10</p>
                            </div>
                            <p class="servico-encaminhado-local">${encaminhamentos_pendentes[x][1]} | ${encaminhamentos_pendentes[x][0]}</p>
                            <p class="urgencia">${encaminhamentos_pendentes[x][2]}</p>
                        </div>
                    </a>`;
            document.getElementById('encaminhamentos_pendentes').innerHTML += infoEncaminhamentosPendentes;
        }
    },
    error: function(){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Erro no retorno dos Encaminhamentos!",
            showConfirmButton: false,
            timer: 3500
          });
    }
});
}

function redirectSolicitacao() {
  window.location.href = '/RF003';
}

$(document).ready(retornaEncaminhamentos)

setInterval(function(){
  retornaEncaminhamentos()
  console.log('Recarregando...')
}, 5000);

// Função para deslogar da conta
function logout() {
  window.location.href = '/logout';
}