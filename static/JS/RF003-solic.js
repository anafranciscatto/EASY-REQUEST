inputServico = document.getElementById('tipo-servico');
inputBloco = document.getElementById('bloco');
inputSalas = document.getElementById('sala');

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
            alert(')X ERROOOOOOOOOO X(');
        }
    });

    $.ajax({
        url: '/retorna_salas',
        type: 'GET',
        success: function(salas){
            for (let x = 0; x < salas.length; x++) {
                var option = document.createElement('option');
                option.value = salas[x][0];
                option.textContent = salas[x][1];
                inputSalas.append(option);
            }
        },
        error: function(){
            alert(')X ERROOOOOOOOOO X(');
        }
    });
}

adicionarServico();