// Adiciona um evento para executar o código assim que o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona o elemento de dropdown de seleção de profissão
    const profissao = document.querySelector('.form-container__select');
    
    // Seleciona as imagens para manutenção e solicitante
    const imgMan = document.querySelector('#img-man');
    const imgSoli = document.querySelector('#img-soli');

    // Função para atualizar a visibilidade das imagens com base na seleção do dropdown
    function updateImages() {
        // Obtém o valor selecionado no dropdown
        const selectedValue = profissao.value;

        // Mostra ambas as imagens inicialmente
        imgMan.classList.remove('hidden');
        imgSoli.classList.remove('hidden');

        // Oculta a imagem que não corresponde à seleção
        if (selectedValue === 'manutencao') {
            imgSoli.classList.add('hidden'); // Oculta a imagem do solicitante se "Manutenção" for selecionado
        } else if (selectedValue === 'solicitante') {
            imgMan.classList.add('hidden'); // Oculta a imagem da manutenção se "Solicitante" for selecionado
        }
    }

    // Inicializa a visibilidade das imagens com base na seleção inicial do dropdown
    updateImages();

    // Adiciona um evento que chama a função updateImages sempre que o valor do dropdown mudar
    profissao.addEventListener('change', updateImages);
});
