# # Importação das funções para conectar o MySQL e criar senhas criptografadas.
# from conexao_SQL import Connection
# from hashlib import sha256

# # Criando as importações do Flask
# from flask import Flask, render_template, request, redirect, session, jsonify

# # Instanciando o WebService
# app = Flask(__name__)

# def cadastrarAdm():
#     myBD = Connection.conectar()

#     mycursor = myBD.cursor()

#     cpf = "43660542806"
#     nome = "Gabriel ChagasFErnandes de Moraes"
#     email = "gabriel.moraes4299@gmail.com"
#     senha = "gabriel123"
#     sn = "SN123456"
#     foto = "foto"
#     permissao = "administrador"
#     id_funcao = ""
#     logado = True
#     senha_criptografada = sha256(senha.encode()).hexdigest()

#     mycursor.execute(f"INSERT INTO tb_funcionarios (CPF_funcionario, nome, email, senha, SN, foto, permissao) VALUES ('{cpf}','{nome}', '{email}', '{senha_criptografada}', '{sn}', '{foto}', '{permissao}');")

#     myBD.commit()
# cadastrarAdm()

# #Rodando o WebService
# app.run(debug=True)

print("Hello World!!!")
