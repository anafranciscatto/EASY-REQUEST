# Importação das funções para conectar o MySQL
from conexao_SQL import Connection

# Crição da Classe Solicitacoes, que executa as funções relacionadas as solicitações de serviço
class Solicitacao:
    def __init__(self) -> None: # Criação de uma solicitação de servico com sua informações vazias.
        self.id_servico = None
        self.id_sala = None
        self.descricao = None
        self.outros_locais = None
        self.CPF_funcionario = None
        
    # Função que adiciona uma nova solicitação de servico no Banco de Dados
    def solicitar_servico(self, id_servico, id_sala, descricao, outros_locais, CPF_funcionario):
        try:
            myBD = Connection.conectar()
            
            mycursor = myBD.cursor()

            self.id_servico = id_servico
            self.id_sala = id_sala
            self.descricao = descricao
            self.outros_locais = outros_locais
            self.CPF_funcionario = CPF_funcionario
            
            mycursor.execute(f"INSERT INTO tb_solicitacoes (id_servico, id_sala, descricao, outros_locais, CPF_funcionario) VALUES ('{id_servico}','{id_sala}', '{descricao}', '{outros_locais}', '{CPF_funcionario}';")

            myBD.commit()

            return True
        except:
            return False
        
         # Função que mostra a  solicitação de servico no Banco de Dados
    def recebimento_servico(self,id_servico,id_sala,descricao,outros_locais,CPF_funcionario):

            myBD = Connection.conectar()
            mycursor = myBD.cursor()


            sql =(f"SELECT tb_solicitacoes (id_servico, id_sala, descricao, outros_locais, CPF_funcionario) VALUES ('{id_servico}','{id_sala}', '{descricao}', '{outros_locais}', '{CPF_funcionario}' = %s;")
            mycursor.execute(sql,(id_servico))
            recebimento= mycursor.fetchall()


            self.recebimento_servico = []
            for recebe in recebimento:
                self.recebimento_servico.append({
                    "id_servico": recebe[0],
                    "id_sala": recebe[1],
                    "descricao":recebe[2],
                    "outros_locais": recebe[3],
                    "CPF_funcionario":recebe[4],
                })                      
                return self.recebimento_servico
            else:
                return None


            

            