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

            mycursor.execute(f"INSERT INTO tb_encaminhamentos (id_solicitacao, CPF_funcionario, urgencia, status) VALUES ({id_solicitacao}, '{CPF_funcionario}', '{prioridade}', '{status}');")

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
  
    def mostrar_encaminhamentos(self, status, cpf_funcionario):
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        self.status = status
        self.cpf_funcionario = cpf_funcionario

        mycursor.execute(f"SELECT s.id_sala, s.bloco, enc.urgencia, sol.id_solicitacao, enc.id_encaminhamento FROM tb_encaminhamentos enc, tb_solicitacoes sol, tb_salas s WHERE enc.id_solicitacao = sol.id_solicitacao AND sol.id_sala = s.id_sala AND enc.status = '{status}' AND enc.CPF_funcionario = '{cpf_funcionario}'")

        mostra_encaminhamentos = mycursor.fetchall()

        return mostra_encaminhamentos

    def aceitar_encaminhamento(self, id_encaminhamento, cpf_funcionario):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.cpf_funcionario = cpf_funcionario

            mycursor.execute(f"SELECT status FROM tb_encaminhamentos WHERE CPF_funcionario = {cpf_funcionario}")

            if mycursor.fetchall != None:
                mycursor.execute(f"UPDATE tb_encaminhamentos SET status = 'fazendo' WHERE id_encaminhamento = {id_encaminhamento};")
                myBD.commit()
                return True
            else:
                return False
        except:
            return False