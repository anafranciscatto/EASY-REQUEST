// Coleta de elementos do formulário
inputServico = document.getElementById('tipo-servico');
inputBloco = document.getElementById('bloco');
inputSalas = document.getElementById('sala');
inputAdendo = document.getElementById('adendo');

// Função que usa os dados do formulário para cadastrar uma solicitação
function fazerSolicitacao() {
    var dados = {
        id_servico:inputServico.value,
        id_sala:inputSalas.value,
        descricao:inputAdendo.value
    }

    $.ajax({
        url: '/fazer_solicitacao',
        type: 'POST',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function(){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Solicitação Enviada!",
                showConfirmButton: false,
                timer: 1500
              });
        },
        error: function(){
            swal ( "Oops!" ,  "Erro ao enviar solicitação!" ,  "error" );
        }

    })
}

// Função que coloca os tipos de serviço no campo do formulário
function retornaServicos() {
    $.ajax({
        url: '/retorna_servicos',
        type: 'GET',
        success: function(servicos){
            for (let x = 0; x < servicos.length; x++) {
                var option = document.createElement('option');
                option.value = servicos[x][0];
                option.textContent = servicos[x][1];
                inputServico.append(option);
            }
        },
        error: function(){
            swal ( "Oops!" ,  "Erro no retorno do Serviço!" ,  "error" );
        }
    });
}

// Função que retorna todos os blocos do SENAI no campo do formulário
function retornaBlocos() {
    $.ajax({
        url: '/retorna_blocos',
        type: 'GET',
        success: function(blocos){
            for (let x = 0; x < blocos.length; x++) {
                var option = document.createElement('option');
                option.value = blocos[x][0];
                option.textContent = blocos[x][0];
                inputBloco.append(option);
            }
        },
        error: function(){
            swal ( "Oops!" ,  "Erro no retorno dos blocos!" ,  "error" );
        }
    });
}

// Função que retorna todas as salas do SENAI no campo do formulário
function retornaSalas(bloco) {
    inputSalas.innerHTML = '<option value="0">Sala</option>';
    $.ajax({
        url: `/retorna_salas/${bloco}`,
        type: 'GET',
        success: function(salas){
            for (let x = 0; x < salas.length; x++) {
                var option = document.createElement('option');
                option.value = salas[x][0];
                option.textContent = salas[x][1] + ' - ' + salas[x][0];
                inputSalas.append(option);
            }
        },
        error: function(){
            swal ( "Oops!" ,  "Erro no retorno das Salas!" ,  "error" );
        }
    });
}

// Executando todas as funções
retornaServicos();
retornaBlocos();
retornaSalas();
// Executando a função retornaSalas somente quando o campo bloco for alterado
inputBloco.addEventListener('change', function() {
    retornaSalas(inputBloco.value)
});