const options = document.querySelectorAll('.option');
const urgencyOptions = document.querySelectorAll('.urgency');
let selectedOptions = [];
let selectedUrgency = null;

options.forEach(option => {
  option.addEventListener('click', () => {
    // Adiciona ou remove a classe 'selected' dependendo do estado atual
    option.classList.toggle('selected');

    // Adiciona ou remove a opção do array de opções selecionadas
    if (option.classList.contains('selected')) {
      selectedOptions.push(option);
    } else {
      selectedOptions = selectedOptions.filter(opt => opt !== option);
    }
  });
});