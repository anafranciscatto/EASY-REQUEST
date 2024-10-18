# Importação das funções para conectar o MySQL e criar senhas criptografadas.
from conexao_SQL import Connection
from hashlib import sha256

def cadastrarAdm():
    try:
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        cpf = "43660542806"
        nome = "Gabriel Chagas Fernandes de Moraes"
        email = "gabriel.moraes4299@gmail.com"
        senha = "gabriel123"
        sn = "SN123456"
        permissao = "administrador"
        senha_criptografada = sha256(senha.encode()).hexdigest()

        mycursor.execute(f"INSERT INTO tb_funcionarios (CPF_funcionario, nome, email, senha, SN, permissao) VALUES ('{cpf}','{nome}', '{email}', '{senha_criptografada}', '{sn}', '{permissao}');")

        myBD.commit()

        return True
    except:
        return False

if cadastrarAdm():
    print("Usuário cadastrado com Sucesso")
else:
    print("Erro ao cadastrar Administrador")
