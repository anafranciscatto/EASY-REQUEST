document.addEventListener("DOMContentLoaded", function() {
    const containerForm = document.querySelector('.container-form');

    // Adiciona a classe 'show' após um pequeno atraso para permitir a transição
    setTimeout(() => {
        containerForm.classList.add('show');
    }, 100); // Ajuste o tempo conforme necessário
});
