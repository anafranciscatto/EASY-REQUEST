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
      error: function(){
        swal ( "Oops!" ,  "Erro ao iniciar serviço!" ,  "error" );
      }
    })
}

function redirectSolicitacao() {
  window.location.href = '/RF003';
}