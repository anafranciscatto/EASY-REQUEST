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

const divFuncionarios = document.getElementById('form_select-user');

function mostraFuncionarios(){
  $.ajax({
    url: '/RF005-retorna-funcionarios',
    type: 'GET',
    success: function(retorna_funcionarios){
        for (let x = 0; x < retorna_funcionarios.length; x++) {
          console.log(retorna_funcionarios[x])

          var div = document.createElement('div');

          div.className = 'caixa-opcao';
          div.setAttribute('onclick', `selecionarFuncionario(${retorna_funcionarios[x][2]})`);
          div.innerHTML = `<figure><img src="https://pics.craiyon.com/2023-06-27/287f2aHeitor Lima 60c2e74386b5a89c517eb527dc.webp" alt="Imagem de Perfil"></figure>
                            <div class="opcao_user"><p>${retorna_funcionarios[x][0]}</p>${retorna_funcionarios[x][1]}</div>
                            <p class="status_disponivel">Disponível</p>
                            <p class="status_n-disponivel">Não Disponível</p>`;
          divFuncionarios.append(div);
          



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


// 
mostraFuncionarios();