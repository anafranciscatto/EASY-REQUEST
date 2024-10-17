function mostrarSolicitacoes() {
    $.ajax({
        url: '/retorna-solicitacoes',
        type: 'GET',
        success: function(solicitacoes){
            console.log(solicitacoes)
            document.getElementById('solicitacoes').innerHTML = '';
            for (let x = 0; x < solicitacoes.length; x++) {
                // var option = document.createElement('option');
                // option.value = blocos[x][0];
                // option.textContent = blocos[x][0];
                // inputBloco.append(option);
                var infoSolicitacoes = `<article class="sectionBaixo__grid-item">
                <div class="card">
                    <!-- Cabeçalho do card com localização do prédio -->
                    <header class="card__header">
                        <span class="card__building" aria-label="Localização do prédio">${solicitacoes[x][2]} - ${solicitacoes[x][1]}</span>
                    </header>
                    <div class="card__body">
                        <!-- Serviço descrito no card -->
                        <p class="card__service" aria-label="Serviço">${solicitacoes[x][5]}</p>
                        <!-- Pessoa que fez a solicitação -->
                        <p class="card__responsavel" aria-label="Responsável pela solicitação">${solicitacoes[x][4]}</p>
                        <!-- Linha horizontal para separação visual -->
                        <hr class="card__linha" aria-hidden="true">
                        <!-- Descrição do serviço -->
                        <p class="card__descricao" aria-label="Descrição do serviço">
                            ${solicitacoes[x][3]}
                        </p>
                    </div>
                    <!-- Rodapé do card com botão de ação -->

                    <footer class="card__footer">
                        <a href="/RF004A/${solicitacoes[x][0]}"><button class="card__button" aria-label="Encaminhar solicitação">Detalhes</button></a>
                    </footer>
                </div>

                </article>`
                document.getElementById('solicitacoes').innerHTML += infoSolicitacoes;
            }
        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro no retorno das solicitações!",
                showConfirmButton: false,
                timer: 3500
              });
        }
    });
}

function funcVoltar() {
    window.location.href = '/tl-administrador'
}

$(document).ready(mostrarSolicitacoes)

setInterval(function(){
    mostrarSolicitacoes()
    console.log('Recarregando...')
}, 5000);
