
const opcao = document.querySelectorAll('.opcao');
const opcaoUrgencia  = document.querySelectorAll('.opcaoUrgencia');

let selecionaOpcao = [];
let selecionaUrgencia = null;

// seleção dos funcionários
opcao.forEach(opcao => {
  opcao.addEventListener('click', () => {
    // Adiciona ou remove a classe 'selected'
    opcao.classList.toggle('selected');

    // Adiciona ou remove a opção
    if (opcao.classList.contains('selected')) {
     selecionaOpcao.push(opcao);
    } else {
     selecionaOpcao = selecionaOpcao.filter(opt => opt !== opcao);
    }
  });
});

//seleção da urgencia
opcaoUrgencia.forEach(opcaoUrgencia =>{
  opcaoUrgencia.addEventListener('click', () =>{  
     if (selecionaUrgencia) {
      selecionaUrgencia.classList.remove('selected');
    }

    selecionaUrgencia = opcaoUrgencia;
    opcaoUrgencia.classList.add('selected');
  })
})