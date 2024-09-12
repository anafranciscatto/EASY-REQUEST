inputServico = document.getElementById('tipo-servico');

function adicionarServico(valor, nome) {
    var option = document.createElement('option');
    option.value = valor;
    option.textContent = nome;
    inputServico.append(option);
}

adicionarServico(valor_servico, nome_servico);