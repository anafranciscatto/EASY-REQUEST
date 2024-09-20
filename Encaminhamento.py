# Importação das funções para conectar o MySQL
from conexao_SQL import Connection

class Encaminhamento:
    def __init__(self) -> None:
        self.id_encaminhamento = None
        self.id_solicitacao = None
        self.id_funcionario = None
        self.prioridade = None
        self.status = None
        self.status_final = None
        self.adendo = None

    def mostra_funcionario(self):

        myBD = Connection.conectar()

        mycursor = myBD.cursor()


        mycursor.execute =(f"SELECT id_encaminhamento,id_solicitacao, adendo,urgencia,status,status_final f.nome, fn.nome from tb_encaminhamento e, tb_funcionarios f, tb_solicitacoes sl WHERE f.CPF_funcionario = e.CPF_funcionario AND sl.id_solicitacao = f.id_solicitacao AND sl.id_encaminhamento = e.id_encaminhamento;")

        mycursor.execute(mycursor)
        mostra_funcionario= mycursor.fetchall()

        return mostra_funcionario