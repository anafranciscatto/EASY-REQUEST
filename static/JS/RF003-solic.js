inputServico = document.getElementById('tipo-servico');


// valor, nome
function adicionarServico() {
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
            alert(')X ERROOOOOOOOOO X(');
        }
    });
}

adicionarServico();