# Importação das funções para conectar o MySQL
from conexao_SQL import Connection

# Crição da Classe Solicitacoes, que executa as funções relacionadas as solicitações de serviço
class Solicitacao:
    def __init__(self) -> None: # Criação de uma solicitação de servico com sua informações vazias.
        self.id_servico = None
        self.id_sala = None
        self.descricao = None
        self.CPF_funcionario = None
        
    # Função que adiciona uma nova solicitação de servico no Banco de Dados
    def solicitar_servico(self, id_servico, id_sala, descricao, CPF_funcionario):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.id_servico = id_servico
            self.id_sala = id_sala
            self.descricao = descricao
            self.CPF_funcionario = CPF_funcionario
            
            mycursor.execute(f"INSERT INTO tb_solicitacoes (id_servico, id_sala, descricao, CPF_funcionario) VALUES ({id_servico},'{id_sala}', '{descricao}', '{CPF_funcionario}');")

            myBD.commit()

            return True
        except:
            return False
        
         # Função que mostra a  solicitação de servico no Banco de Dados
    def recebimento_solicitacao(self):
            myBD = Connection.conectar()
            mycursor = myBD.cursor()

            sql =(f"SELECT id_solicitacao,id_servico,id_sala,descricao,CPF_funcionario from tb_solicitacoes;")
            mycursor.execute(sql)
            recebimento= mycursor.fetchall()

            # recebimento_solicitacao = []
            # solicitacao = []
            # for recebe in recebimento:
            #     solicitacao.append({
            #          "id_solicitacao": recebe[0],
            #         "id_servico": recebe[1],
            #         "id_sala": recebe[2],
            #         "descricao":recebe[3],
            #         "CPF_funcionario":recebe[4]
            #     })
            #     recebimento_solicitacao.append(solicitacao)
            return recebimento