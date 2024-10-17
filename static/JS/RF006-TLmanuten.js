// Função Para a o Recebimento dos serviços
function iniciarServico(id_encaminhamento) {
    $.ajax({
      url: `/iniciar-servico/${id_encaminhamento}`,
      type: 'GET',
      success: function(){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Serviço Iniciado!",
            showConfirmButton: false,
            timer: 1500
          });

          setTimeout(() => {
            window.location.href = '/RF006';
        }, 1500);
      },
      error: function(mensagem){
        console.log(mensagem)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: mensagem['responseText'],
          showConfirmButton: false,
          timer: 3500
        });
      }
    })
}

function funcVoltar() {
  window.location.href = '/RF006'
}

function redirectSolicitacao() {
  window.location.href = '/RF003';
}

// Função para deslogar da conta
function logout() {
  window.location.href = '/logout';
}