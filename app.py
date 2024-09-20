
# Criando as importações do Flask
from flask import Flask, render_template, request, redirect, session, jsonify
from Solicitacao import Solicitacao
from conexao_SQL import Connection
# Importando a classe Usuario
from Usuario import Usuario
from Encaminhamento import Encaminhamento

# Instanciando o WebService
app = Flask(__name__)

# Criando uma senha para criptografar sessão
app.secret_key = "capivara"

# Criando rota para a página inicial
@app.route("/")
def pg_inicio():
    return render_template("index.html")

# Criando rota para a tela de cadastro
@app.route("/RF001", methods=["GET", "POST"])
def pg_cadastro(): # Função que executa o cadastro
    if request.method == "GET":
        return render_template("RF001-cad.html")
    else:
        cpf = request.form["cpf"]
        nome = request.form["nome"]
        email = request.form["email"]
        senha = request.form["senha"]
        sn = request.form["sn"]
        foto = request.form["foto"]
        id_funcao = int(request.form["funcao"])

        if id_funcao >= 2 and id_funcao <= 7:
            permissao = "solicitante"
        elif id_funcao == 1:
            permissao = "manutencao"

        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        mycursor.execute(f"SELECT nome FROM tb_funcoes WHERE id_funcao = {id_funcao}")

        funcao = mycursor.fetchone()

        usuario = Usuario()

        if usuario.cadastrar(cpf, nome, email, senha, sn, foto, permissao, id_funcao):
            session["usuario"] = {"CPF":cpf ,"nome":nome,"sn":sn, "foto":foto, "funcao":funcao[0],"permissao":permissao}

            if session["usuario"]["permissao"] == "administrador":
                return redirect("/RF002")
            
            elif session["usuario"]["permissao"] == "manutencao":
                return redirect("/RF003")
            
            elif session["usuario"]["permissao"] == "solicitante":
                return redirect("/RF003")
        else:
            return redirect("/")

# Criando rota para a tela de login
@app.route("/RF002",methods=["GET","POST"])
def pg_login(): # Função que executa o login
    usuario = Usuario()
    if request.method == "GET":
        if session.get("usuario","erro") == "Autenticado": 
            return redirect("/")
        else:
            return render_template("RF002-log.html")
    else:
        sn = request.form["inp-SN"]
        senha = request.form["inp-senha"]

        usuario.logar(sn, senha)

        if usuario.logado:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            mycursor.execute(f"SELECT nome FROM tb_funcoes WHERE id_funcao = {usuario.id_funcao}")

            funcao = mycursor.fetchone()

            session["usuario"] = {"CPF":usuario.cpf, "nome":usuario.nome, "sn":sn, "foto":usuario.foto,"funcao":funcao[0], "permissao":usuario.permissao}
            
            if session["usuario"]["permissao"] == "administrador":
                return redirect("/")
            
            elif session["usuario"]["permissao"] == "manutencao":
                return redirect("/RF003")
            
            elif session["usuario"]["permissao"] == "solicitante":
                return redirect("/RF003")
        else:
            session.clear()
            return redirect("/")

# Criando rota para a tela de solicitacao
@app.route("/RF003")
def pg_solicitacao(): # Função que abre a tela de fazer solicitação
    nome = session["usuario"]["nome"]
    funcao = session["usuario"]["funcao"]

    return render_template("RF003-solic.html", campo_nome = nome, campo_funcao = funcao)

# Criando rota para a função que executa a solicitação
@app.route("/fazer_solicitacao", methods=["POST"])
def fazer_solicitacao(): # Função que executa a solicitação
    dados = request.get_json()
    id_servico = int(dados["id_servico"])
    id_sala = dados["id_sala"]
    descricao = dados["descricao"]
    cpf = session["usuario"]["CPF"]

    solicitacao = Solicitacao()

    if solicitacao.solicitar_servico(id_servico, id_sala, descricao, cpf):
        return jsonify({'mensagem':'Cadastro OK'}), 200
    else:
        return {'mensagem':'ERRO'}, 500

# Criando rota para a função que retorna os serviços possíveis
@app.route("/retorna_servicos")
def retorna_servicos(): # Função que retorna os serviços possíveis
    myBD = Connection.conectar()

    mycursor = myBD.cursor()

    mycursor.execute(f"SELECT * FROM tb_servicos")

    servicos = mycursor.fetchall()

    return jsonify(servicos), 200

# Criando rota para a função que retorna todos os blocos do SENAI
@app.route("/retorna_blocos")
def retorna_blocos(): # Função que retorna todos os blocos do SENAI
    myBD = Connection.conectar()

    mycursor = myBD.cursor()

    mycursor.execute(f"SELECT DISTINCT bloco FROM tb_salas")

    blocos = mycursor.fetchall()

    return jsonify(blocos), 200

# Criando rota para a função que retorna todas as salas do SENAI
@app.route("/retorna_salas/<bloco>")
def retorna_salas(bloco): # Função que retorna todas as salas do SENAI
    myBD = Connection.conectar()

    mycursor = myBD.cursor()

    print(f"Bloco: {bloco}")

    if bloco == "0":
        mycursor.execute(f"SELECT id_sala, nome_sala FROM tb_salas")
    else:
        mycursor.execute(f"SELECT id_sala, nome_sala FROM tb_salas WHERE bloco = '{bloco}'")

    sala = mycursor.fetchall()

    return jsonify(sala), 200

@app.route("/RF004",methods=["GET"])
def pg_ADM_recebe_solicitacao():
    # id_solicitacao=request.args.get(servico)
    servico = Solicitacao()
    recebimento = servico.recebimento_solicitacoes()

    nome = session["usuario"]["nome"]
    funcao = session["usuario"]["funcao"]

    return render_template("RF004-ADMrecbSolic.html",campo_recebimento = recebimento, campo_nome = nome, campo_funcao = funcao)

@app.route('/RF004A/<rowid>')
def pg_ver_solicitacao(rowid):
     saibamais=Solicitacao()
     detalhes = saibamais.recebimento_solicitacao(id_solicitacao=rowid)

     print(detalhes)

     return render_template("RF004A-detlSolic.html", campo_sala = detalhes[2], campo_servico = detalhes[1], campo_nome_solicitante = detalhes[4], campo_funcao_solicitante = detalhes[5], campo_descricao = detalhes[3], campo_id_solicitacao = detalhes[0])

@app.route("/RF005/<id_solicitacao>")
def pg_encaminhar_solicitacao(id_solicitacao):
    return render_template("RF005-encamSolic.html", campo_id_solicitacao = id_solicitacao)

@app.route("/realizar-encaminhamento/<id_solicitacao>")
def realizar_encaminhamento(id_solicitacao):
    dados = request.get_json()
    CPF_funcionario = dados["CPF_funcionario"]
    prioridade = dados["prioridade"]
    status = dados["status"]
    status_final = dados["status_final"]
    adendo = dados["adendo"]

    encaminhamento = Encaminhamento()

    encaminhamento.realizar_encaminhamento(id_solicitacao, CPF_funcionario, prioridade, status, status_final, adendo)

    return render_template("RF005-encamSolic.html")

@app.route("/RF006")
def pg_manutencao():
    return render_template("RF006-TLmanuten.html")

@app.route("/RF007")
def pg_manutencao_confirmacao():
    return render_template("RF007-manutConfirm.html")

@app.route("/RF008")
def pg_fim_chamado():
    return render_template("RF008-fimchamado.html")

@app.route("/RF009")
def pg_relatorio():
    return render_template("RF009-relatorio.html")

#Rodando o WebService
app.run(debug=True)
