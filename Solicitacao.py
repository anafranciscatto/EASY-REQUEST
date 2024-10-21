# Importação das funções para conectar o MySQL
from conexao_SQL import Connection
from datetime import datetime

# Crição da Classe Solicitacoes, que executa as funções relacionadas as solicitações de serviço
class Solicitacao:
    def __init__(self) -> None: # Criação de uma solicitação de servico com sua informações vazias.
        self.id_servico = None
        self.id_sala = None
        self.descricao = None
        self.CPF_funcionario = None
        
    # Função que adiciona uma nova solicitação de servico no Banco de Dados
    def solicitar_servico(self, id_servico, id_sala, descricao, CPF_funcionario, foto):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.id_servico = id_servico
            self.id_sala = id_sala
            self.descricao = descricao
            self.CPF_funcionario = CPF_funcionario
            self.foto = foto
            data_inicio = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            if foto:
                mycursor.execute(f"INSERT INTO tb_solicitacoes (id_servico, id_sala, descricao, CPF_funcionario, foto, data_inicio) VALUES ({id_servico},'{id_sala}', '{descricao}', '{CPF_funcionario}', '{foto}','{data_inicio}');")
            else:
                mycursor.execute(f"INSERT INTO tb_solicitacoes (id_servico, id_sala, descricao, CPF_funcionario, data_inicio) VALUES ({id_servico},'{id_sala}', '{descricao}', '{CPF_funcionario}', '{data_inicio}');")

            myBD.commit()

            return True
        except:
            return False
        
         # Função que mostra a  solicitação de servico no Banco de Dados
    def recebimento_solicitacoes(self):
            myBD = Connection.conectar()
            mycursor = myBD.cursor()

            sql =(f"SELECT s.id_solicitacao, sv.nome, id_sala, descricao, f.nome, IF(fn.id_funcao IS NULL, 'Administrador', fn.nome) AS nome_funcao , DATE_FORMAT(s.data_inicio, '%d/%m/%Y') AS data_inicio_brasileira FROM tb_solicitacoes s JOIN tb_funcionarios f ON f.CPF_funcionario = s.CPF_funcionario LEFT JOIN tb_funcoes fn ON fn.id_funcao = f.id_funcao JOIN tb_servicos sv ON sv.id_servico = s.id_servico LEFT JOIN tb_encaminhamentos enc ON enc.id_solicitacao = s.id_solicitacao WHERE enc.id_solicitacao IS NULL ORDER BY s.data_inicio;")
            mycursor.execute(sql)
            recebimento = mycursor.fetchall()

            return recebimento

    def recebimento_solicitacao(self,id_solicitacao):
        myBD = Connection.conectar()
        mycursor = myBD.cursor()

        sql =(f"SELECT id_solicitacao, sv.nome, id_sala, descricao, f.nome, IF(fn.id_funcao IS NULL, 'Administrador', fn.nome) AS nome_funcao, s.foto FROM tb_solicitacoes s JOIN tb_funcionarios f ON f.CPF_funcionario = s.CPF_funcionario LEFT JOIN tb_funcoes fn ON fn.id_funcao = f.id_funcao JOIN tb_servicos sv ON sv.id_servico = s.id_servico and s.id_solicitacao={id_solicitacao};")
        mycursor.execute(sql)
        recebimento= mycursor.fetchone()

        return recebimento
    
    def deletar_solicitacao(self, id_solicitacao):
        try:
            myBD = Connection.conectar()
            mycursor = myBD.cursor()

            mycursor.execute(f"DELETE FROM tb_solicitacoes WHERE id_solicitacao = {id_solicitacao}")

            myBD.commit()

            return True
        except:
            return False