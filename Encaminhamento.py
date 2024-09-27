# Importação das funções para conectar o MySQL
from conexao_SQL import Connection

class Encaminhamento:
    def __init__(self) -> None:
        self.id_encaminhamento = None
        self.id_solicitacao = None
        self.CPF_funcionario = None
        self.prioridade = None
        self.status = None
        self.status_final = None
        self.adendo = None

    def realizar_encaminhamento(self, id_solicitacao, CPF_funcionario, prioridade):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.id_solicitacao = id_solicitacao
            self.CPF_funcionario = CPF_funcionario
            self.prioridade = prioridade
            status = 'à fazer'

            mycursor.execute(f"INSERT INTO tb_encaminhamento (id_solicitacao, CPF_funcionario, urgencia, status) VALUES ({id_solicitacao}, '{CPF_funcionario}', '{prioridade}', '{status}');")

            myBD.commit()

            return True
        except:
            return False

    def mostra_funcionarios(self):

        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        mycursor.execute(f"SELECT fn.nome, f.nome, f.CPF_funcionario from tb_funcionarios f, tb_funcoes fn WHERE f.id_funcao = fn.id_funcao AND permissao = 'manutencao';")

        mostra_funcionarios = mycursor.fetchall()

        return mostra_funcionarios