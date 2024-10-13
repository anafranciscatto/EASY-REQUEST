document.getElementById('menuHamburguer').addEventListener('click', function() {
    document.getElementById('menuList').classList.toggle('active');
});

function logout() {
    window.location.href = '/logout';
}