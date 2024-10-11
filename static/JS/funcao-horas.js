function obterSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 6 && hora < 12) {
        return "Bom dia, ";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde, ";
    } else {
        return "Boa noite, ";
    }
}

document.getElementById('saudacao').textContent = obterSaudacao();
