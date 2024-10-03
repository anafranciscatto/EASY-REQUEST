document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o ScrollReveal e define a configuração global
    window.sr = ScrollReveal({ 
        reset: true  // Efeito se repete sempre que o elemento reaparece na tela
    });

    // Aplica o efeito de revelação ao elemento com o ID 'container-main'
    sr.reveal('#container-main', {
        duration: 1000,  // Duração da animação em milissegundos
        origin: 'top',   // Elemento surge do topo
        distance: '50px' // Distância percorrida pelo elemento
    });

    // Aplica o efeito de revelação ao formulário após um pequeno atraso
    const containerForm = document.querySelector('.container-form');
    setTimeout(() => {
        containerForm.classList.add('show');
    }, 100); // Ajuste o tempo conforme necessário

    // Aplica o efeito de revelação ao elemento com o ID 'container-form'
    sr.reveal('#container-form', {
        duration: 1000,     // Duração da animação (1 segundo)
        scale: 0.5,         // O elemento começa com 50% do tamanho e cresce até 100%
        easing: 'ease-in-out', // Suaviza a transição
        distance: '0px',    // Remove o movimento, apenas o efeito de escala
       
    });

    // Aplica o efeito de revelação ao #container-footer (surgindo de baixo para cima)
    sr.reveal('#container-footer', {
        duration: 1000,   // Duração da animação (1 segundo)
        origin: 'bottom', // O rodapé aparece de baixo para cima
        distance: '100px', // Distância que o rodapé percorre ao surgir
        easing: 'ease-in-out',
        opacity: 0
    });

});



document.addEventListener("DOMContentLoaded", function() {
    const containerForm = document.querySelector('.container-form');

    // Adiciona a classe 'show' após um pequeno atraso para permitir a transição
    setTimeout(() => {
        containerForm.classList.add('show');
    }, 100); // Ajuste o tempo conforme necessário
});


