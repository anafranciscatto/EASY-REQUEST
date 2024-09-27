// Inicializa o ScrollReveal e define a configuração global
window.sr = ScrollReveal({ 
    // Define se a animação será executada novamente quando o elemento reaparecer na visualização. 'true' significa que o efeito se repetirá sempre que o elemento entrar na tela.
    reset: true 
});

// Aplica o efeito de revelação ao elemento com o ID 'logo'
sr.reveal('#logo', {
     // Define a duração da animação para 1000 milissegundos (1 segundo)
    duration: 1000,    
    // Define a origem da animação como sendo do topo, fazendo o elemento aparecer de cima para baixo
    origin: 'top',   
     // Define a distância que o elemento percorrerá (50px) ao surgir na tela   
    distance: '50px'   
});

// Aplica o efeito de revelação ao elemento com o ID 'container-abaixo'
sr.reveal('#container-abaixo', {
    // Define a duração da animação para 1000 milissegundos (1 segundo)
    duration: 1000,   
    // Define a origem da animação como sendo da parte inferior, fazendo o elemento aparecer de baixo para cima  
    origin: 'bottom',
    // Define a distância que o elemento percorrerá (50px) ao surgir na tela   
    distance: '50px',   
    // Define a suavidade da animação, usando a função de 'ease-out' para um efeito de desaceleração ao final
    easing: 'ease-out'  
});
