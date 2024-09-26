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

        mycursor.execute(f"SELECT fn.nome, f.nome from tb_funcionarios f, tb_funcoes fn WHERE fn.id_funcao = f.id_funcao;")

        mycursor.execute(mycursor)
        mostra_funcionario= mycursor.fetchall()

        return mostra_funcionario