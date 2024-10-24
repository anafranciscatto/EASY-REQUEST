// Obtém o modal
const modal = document.getElementById("modal");

// Obtém o botão "Ver mais"
const botaoVerMais = document.querySelector(".conteudo__botao");

// Obtém o botão de fechar
const fecharModal = document.getElementById("fecharModal");

// Quando o botão "Ver mais" é clicado, abre o modal
botaoVerMais.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clica no botão de fechar, fecha o modal
fecharModal.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
