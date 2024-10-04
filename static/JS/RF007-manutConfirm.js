document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o ScrollReveal e define a configuração global
    window.sr = ScrollReveal({ 
        reset: true  // Efeito se repete sempre que o elemento reaparece na tela
    });

    // Aplica o efeito de revelação ao elemento com o ID 'container-header'
    sr.reveal('#cabecalho', {
        duration: 500,  // Duração da animação em milissegundos
        origin: 'top',   // Elemento surge do topo
        distance: '50px' // Distância percorrida pelo elemento
    });

    // Aplica o efeito de revelação ao elemento com o ID 'conteudo-principal'
    sr.reveal('#principal__container', {
        duration: 800,  // Duração da animação (mais lenta)
        origin: 'bottom',  // Elemento surge de baixo
        distance: '100px', // Distância que o elemento vai percorrer
        delay: 200,  // Atraso antes de iniciar a animação
        easing: 'ease-in-out',  // Tipo de suavização do movimento
    });
});
