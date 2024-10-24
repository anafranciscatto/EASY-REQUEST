function criarRelatório(id_encaminhamento) {
    $.ajax({
        url: `/RF009/${id_encaminhamento}`,
        type: 'GET',
        success: function(detalhes_encaminhamento){

        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro na criação do Relatório",
                showConfirmButton: false,
                timer: 3500
              });
        }
    });
}