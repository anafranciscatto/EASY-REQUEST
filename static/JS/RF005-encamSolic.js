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
          div.id = `${retorna_funcionarios[x][1]}`
          div.setAttribute('onclick', `selecionarFuncionario('${retorna_funcionarios[x][1]}');`);
          if (retorna_funcionarios[x][2]) {
            div.innerHTML = `<figure><img src="${retorna_funcionarios[x][2]}" alt="Foto de Perfil"></figure>
                            <div class="opcao_user">${retorna_funcionarios[x][0]}</div>`;
          }else{
            div.innerHTML = `<figure><img src="https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg" alt="Foto de Perfil"></figure>
            <div class="opcao_user">${retorna_funcionarios[x][0]}</div>`;
          }

          divFuncionarios.append(div);
        }
    },
    error: function(){
      swal ( "Oops!" ,  "Falha no emcaminhamento!" ,  "error" );;
    }
});
}

function selecionarFuncionario(id_funcionario) {
  // Se já houver um funcionário selecionado, remove a classe 'selected' dele
  if (funcionarioSelecionado) {
    document.getElementById(`${funcionarioSelecionado}`).classList.remove('selected');
  }

  // Se o funcionário clicado for diferente do atualmente selecionado, adiciona a classe
  if (funcionarioSelecionado !== id_funcionario) {
    funcionarioSelecionado = id_funcionario;
    document.getElementById(`${id_funcionario}`).classList.add('selected');
  } else {
    // Se o funcionário clicado já estiver selecionado, desmarca ele
    funcionarioSelecionado = '';
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
        window.location.href = '/RF004';
    },
    error: function(){
        alert("ERRO AO ENCAMINHAR!")
    }

  })
}

mostraFuncionarios();