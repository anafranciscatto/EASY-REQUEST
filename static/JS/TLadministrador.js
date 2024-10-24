document.getElementById('menuHamburguer').addEventListener('click', function() {
    document.getElementById('menuList').classList.toggle('active');
});

function redirectSolicitacao(params) {
    window.location.href = '/RF003';
}

function logout() {
    window.location.href = '/logout';
}


