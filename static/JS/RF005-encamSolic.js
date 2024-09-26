
const opcao = document.querySelectorAll('.opcao');
const opcaoUrgencia  = document.querySelectorAll('.opcaoUrgencia');

let selecionaOpcao = '';
let selecionaUrgencia = '';


function selecaoFuncionario(){
  // seleção dos funcionários
  opcao.forEach(opcao => {
    opcao.addEventListener('change', () => {
     
      for(const option of opcao.options)

    });
  });

    //seleção da urgencia
  opcaoUrgencia.forEach(opcaoUrgencia =>{
    opcaoUrgencia.addEventListener('click', () =>{  
      
      
    })
  });
}

// Executando todas as funções
selecaoFuncionario();

