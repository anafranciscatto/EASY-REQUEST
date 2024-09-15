// Função que retorna a data atual atualizada
const updateDate = () => {
    const now = new Date();
    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    document.querySelector('#dia-semana').textContent = dias[now.getDay()];
    document.querySelector('#dia').textContent = now.getDate();
    document.querySelector('#mes').textContent = meses[now.getMonth()];
}

// Esta função é chamada quando a página termina de carregar
// (evento DOMContentLoaded)

updateDate();