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