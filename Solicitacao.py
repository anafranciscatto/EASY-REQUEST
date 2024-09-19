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
    def recebimento_solicitacoes(self):
            myBD = Connection.conectar()
            mycursor = myBD.cursor()

            sql =(f"SELECT id_solicitacao, sv.nome, id_sala, descricao, f.nome, fn.nome from tb_solicitacoes s, tb_funcionarios f, tb_funcoes fn, tb_servicos sv WHERE f.CPF_funcionario = s.CPF_funcionario AND fn.id_funcao = f.id_funcao AND sv.id_servico = s.id_servico 
            order by s.id_solicitacao desc;") 
            mycursor.execute(sql)
            recebimento= mycursor.fetchall()

            return recebimento
    
    def recebimento_solicitacao(self,id_solicitacao):
            myBD = Connection.conectar()
            mycursor = myBD.cursor()

            sql =(f"SELECT id_solicitacao, sv.nome, id_sala, descricao, f.nome, fn.nome from tb_solicitacoes s, tb_funcionarios f, tb_funcoes fn, tb_servicos sv WHERE f.CPF_funcionario = s.CPF_funcionario AND fn.id_funcao = f.id_funcao AND sv.id_servico = s.id_servico and s.id_solicitacao={id_solicitacao};") 
            mycursor.execute(sql)
            recebimento= mycursor.fetchone()

            return recebimento