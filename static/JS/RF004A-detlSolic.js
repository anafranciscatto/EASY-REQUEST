function funcVoltar() {
        window.location.href = '/RF004'
}

// Função que retorna todos os blocos do SENAI no campo do formulário
function deletarSolicitacao(id_solicitacao) {
        Swal.fire({
                title: "Você tem certeza?",
                text: "Isso deletará a solicitação permanentemente!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--colorGreen)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Deletar",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                        $.ajax({
                                url: `/deletar-solicitacao/${id_solicitacao}`,
                                type: 'GET',
                                success: function(){
                                        Swal.fire({
                                                title: "Deletado!",
                                                text: "A solicitação foi deletada com sucesso",
                                                icon: "success",
                                                showConfirmButton: false
                                        });
                                        
                                        setTimeout(() => {
                                                window.location.href = '/RF004';
                                        }, 2500);
                                },
                                error: function(){
                                        Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "Falha ao deletar a solicitação",
                                                showConfirmButton: false,
                                                timer: 3500
                                              });
                                }
                        });
                }
              });
    }