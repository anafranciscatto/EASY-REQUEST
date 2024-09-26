// const opcao = document.querySelectorAll('.opcao');
// const urgencyOptions = document.querySelectorAll('.urgency');
// let selectedOptions = [];
// let selectedUrgency = null;

// opcao.forEach(opcao => {
//   opcao.addEventListener('click', () => {
//     // Adiciona ou remove a classe 'selected' dependendo do estado atual
//     opcao.classList.toggle('selected');

//     // Adiciona ou remove a opção do array de opções selecionadas
//     if (opcao.classList.contains('selected')) {
//       selectedOptions.push(opcao);
//     } else {
//       selectedOptions = selectedOptions.filter(opt => opt !== opcao);
//     }
//   });
// });

// console.log(selectedOptions)

// // function selecaoFuncionario(){
// //   // seleção dos funcionários
// //   opcao.forEach(opcao => {
// //     opcao.addEventListener('change', () => {
     
// //       for(const option of opcao.options)

// //     });
// //   });

// //     //seleção da urgencia
// //   opcaoUrgencia.forEach(opcaoUrgencia =>{
// //     opcaoUrgencia.addEventListener('click', () =>{  
      
      
// //     })
// //   });
// // }

// // // Executando todas as funções
// // selecaoFuncionario();

function selecaoFuncionario(){
  $.ajax({
    url: '/RF005-retorna-funcionarios',
    type: 'GET',
    success: function(retorna_funcionarios){
        for (let x = 0; x < retorna_funcionarios.length; x++) {
          console.log(retorna_funcionarios[x])
            // var option = document.createElement('option');
            // option.value = servicos[x][0];
            // option.textContent = servicos[x][1];
            // inputServico.append(option);
        }
    },
    error: function(){
        alert(')X ERROOOOOOOOOO X(');
    }
});
}

selecaoFuncionario();