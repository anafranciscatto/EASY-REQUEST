const divFuncionarios = document.getElementById('form_select-user');
var funcionarioSelecionado;
var prioridadeSelecionada;

function mostraFuncionarios(){
  $.ajax({
    url: '/RF005-retorna-funcionarios',
    type: 'GET',
    success: function(retorna_funcionarios){
        for (let x = 0; x < retorna_funcionarios.length; x++) {
          console.log(retorna_funcionarios[x])

          var div = document.createElement('div');

          div.className = 'caixa-opcao';
          div.id = `${retorna_funcionarios[x][2]}`
          div.setAttribute('onclick', `selecionarFuncionario('${retorna_funcionarios[x][2]}');`);
          div.innerHTML = `<figure><img src="https://pics.craiyon.com/2023-06-27/287f2a60c2e74386b5a89c517eb527dc.webp" alt="Imagem de Perfil"></figure>
                            <div class="opcao_user"><p>${retorna_funcionarios[x][0]}</p>${retorna_funcionarios[x][1]}</div>
                            <p class="status_disponivel">Disponível</p>
                            <p class="status_n-disponivel">Não Disponível</p>`;
          divFuncionarios.append(div);
        }
    },
    error: function(){
        alert(')X ERROOOOOOOOOO X(');
    }
});
}

function selecionarFuncionario(id_funcionario){
  if (funcionarioSelecionado == id_funcionario) {
    funcionarioSelecionado = '';
    document.getElementById(`${id_funcionario}`).classList.remove('selected');
  }
  else{
    funcionarioSelecionado = id_funcionario;
    document.getElementById(`${id_funcionario}`).classList.add('selected');
  }
  console.log(funcionarioSelecionado)
}

function selecionarPrioridade(id_prioridade) {
  if (prioridadeSelecionada == id_prioridade) {
    prioridadeSelecionada = '';
    document.getElementById(`${id_prioridade}`).classList.remove('selected');
  }
  else{
    document.getElementById('baixa').classList.remove('selected');
    document.getElementById('media').classList.remove('selected');
    document.getElementById('alta').classList.remove('selected');
    prioridadeSelecionada = id_prioridade;
    document.getElementById(`${id_prioridade}`).classList.add('selected');
  }
  console.log(prioridadeSelecionada);
}

function realizarEncaminhamento(id_solicitacao) {
  var dados = {
    id_solicitacao:id_solicitacao,
    CPF_funcionario:funcionarioSelecionado,
    prioridade:prioridadeSelecionada
  }

  console.log(dados);

  $.ajax({
    url: '/realizar-encaminhamento',
    type: 'POST',
    data: JSON.stringify(dados),
    contentType: 'application/json',
    success: function(){
        window.location.href = '/RF006';
    },
    error: function(){
        alert("ERRO AO ENCAMINHAR!")
    }

  })
}

mostraFuncionarios();