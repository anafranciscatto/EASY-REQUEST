$(document).ready(function() {
    const senhaInput = $('#senha');
    const requisitos = {
        minLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialChar: false
    };

    const requisito1 = $('#requisito1');
    const requisito2 = $('#requisito2');
    const requisito3 = $('#requisito3');
    const requisito4 = $('#requisito4');
    const mensagem = $('#mensagem');

    senhaInput.on('focus', function() {
        $('#senha-requisitos').removeClass('hidden');
    });

    senhaInput.on('input', function() {
        const senha = senhaInput.val();
        requisitos.minLength = senha.length >= 6;
        requisitos.hasLetter = /[a-zA-Z]/.test(senha);
        requisitos.hasNumber = /\d/.test(senha);
        requisitos.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        // Atualiza os requisitos
        requisito1.toggleClass('validado', requisitos.minLength);
        requisito2.toggleClass('validado', requisitos.hasLetter);
        requisito3.toggleClass('validado', requisitos.hasNumber);
        requisito4.toggleClass('validado', requisitos.hasSpecialChar);

        // Verifica se todos os requisitos foram atendidos
        if (requisitos.minLength && requisitos.hasLetter && requisitos.hasNumber && requisitos.hasSpecialChar) {
            // Limpa os outros textos e mostra apenas a mensagem de validação
            requisito1.addClass('hidden');
            requisito2.addClass('hidden');
            requisito3.addClass('hidden');
            requisito4.addClass('hidden');
            mensagem.removeClass('hidden').text('Senha validada');
        } else {
            // Restaura os textos dos requisitos se a senha não for válida
            mensagem.addClass('hidden');
            requisito1.removeClass('hidden');
            requisito2.removeClass('hidden');
            requisito3.removeClass('hidden');
            requisito4.removeClass('hidden');
        }
    });
});
