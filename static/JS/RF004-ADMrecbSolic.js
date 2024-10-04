document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o ScrollReveal e define a configuração global
    window.sr = ScrollReveal({ 
        reset: true  // Efeito se repete sempre que o elemento reaparece na tela
    });

     // Aplica o efeito de revelação ao elemento com o ID 'container-main'
     sr.reveal('#header__user-info', {
        duration: 500,  // Duração da animação em milissegundos
        origin: 'top',   // Elemento surge do topo
        distance: '50px' // Distância percorrida pelo elemento
    });

    sr.reveal('#header__date-container', {
        duration: 500,
        origin: 'top',
        distance: '30px' // Distância menor para evitar movimento exagerado
    });
    
    sr.reveal('#sectionBaixo', {
        duration: 500,
        origin: 'bottom',
        distance: '50px', // Diminuir a distância
        easing: 'ease-in-out',
        opacity: 0
    });

    sr.reveal('#card', {
        duration: 500,
        origin: 'bottom',
        distance: '50px', // Diminuir a distância
        easing: 'ease-in-out',
        opacity: 0
    });
    

});
