# Importação das funções para conectar o MySQL
from conexao_SQL import Connection

class Solicitacoes:
    def __init__(self) -> None:
        self.id_servico = None
        self.id_sala = None
        self.descricao = None
        self.outros_locais = None
        self.CPF_funcionario = None
        
    def solicitar(self, id_servico, id_sala, descricao, outros_locais, CPF_funcionario):
        myBD = Connection.conectar()
        
        mycursor = myBD.cursor()
        
        pass