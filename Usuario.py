# Importação das funções para conectar o MySQL e criar senhas criptografadas.
from conexao_SQL import Connection
from hashlib import sha256

# Criação da classe Usuario, que guarda as informações e funções relacionadas ao usuario.
class Usuario:
    def __init__(self) -> None: # Função que cria o usuário com suas informações vazias.
        self.cpf = None
        self.nome = None
        self.email = None
        self.senha = None
        self.sn = None
        self.foto = None
        self.permissao = None
        self.id_funcao = None
        self.logado = False

    def cadastrar(self, cpf, nome, email, senha, sn, foto, permissao, id_funcao): # Função que cadastra o usuário no Banco de Dados.
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.cpf = cpf
            self.nome = nome
            self.email = email
            self.senha = senha
            self.sn = sn
            self.foto = foto
            self.permissao = permissao
            self.id_funcao = id_funcao
            self.logado = True
            senha_criptografada = sha256(self.senha.encode()).hexdigest()

            mycursor.execute(f"INSERT INTO tb_funcionarios (CPF_funcionario, nome, email, senha, SN, foto, permissao, id_funcao) VALUES ('{cpf}','{nome}', '{email}', '{senha_criptografada}', '{sn}', '{foto}', '{permissao}', {id_funcao});")

            myBD.commit()

            return True
        except:
            return False

    def logar(self, sn, senha): # Função que executa o login do usuário no sistema.
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        self.senha = senha
        senha_criptografada = sha256(self.senha.encode()).hexdigest()

        mycursor.execute(f"SELECT CPF_funcionario, nome, SN, foto, permissao FROM tb_funcionarios WHERE SN = '{sn}' AND BINARY senha = '{senha}';")

        resultado = mycursor.fetchone()
        print(resultado)

        if  resultado != None:
            self.logado = True
            self.cpf = resultado[0]
            self.nome = resultado[1]
            self.sn = resultado[2]
            self.foto = resultado[3]
            self.permissao = resultado[4]
            
        else:
            self.logado = False