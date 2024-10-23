# Criando as importações do Flask
from flask import Flask, render_template, request, redirect, session, jsonify, url_for
from Solicitacao import Solicitacao
from conexao_SQL import Connection

# Criando importações do Bloob do Azure
from azure.storage.blob import BlobServiceClient
from upload_file import upload_file

# Importando a classe Usuario
from Usuario import Usuario
from Encaminhamento import Encaminhamento

# Instanciando o WebService
app = Flask(__name__)   

# Criando uma senha para criptografar sessão
app.secret_key = "capivara"

# Criando rota para a página inicial
@app.route("/")
def pg_inicio(): # Função que renderiza a tela inicial
    if "usuario" in session:
        permissao = session["usuario"]["permissao"]

        if permissao == "administrador":
            return redirect("/tl-administrador")
        elif permissao == "manutencao":
            return redirect("/RF006")
        elif permissao == "solicitante":
            return redirect("/RF003")
    else:
        return render_template("index.html")

# Criando a rota para a tela do administrador
@app.route("/tl-administrador")
def tl_administrador(): # Função que renderiza a tela do administrador
    funcao = session["usuario"]["funcao"]
    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("TLadministrador.html", campo_nome = primeiro_ultimo_nome, campo_funcao = funcao)

# Criando a rota para a tela do solicitante
@app.route("/tl-solicitante")
def tl_solicitante(): # Função que renderiza a tela do solicitante
    funcao = session["usuario"]["funcao"]
    foto = session["usuario"]["foto"]
    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("TLsolicitante.html", campo_nome = primeiro_ultimo_nome, campo_funcao = funcao, campo_foto = foto)

# Criando rota para a tela de cadastro
@app.route("/RF001")
def pg_cadastro(): # Função que renderiza a tela de cadastro
    return render_template("RF001-cad.html")

# Criando rota para realizar o cadastro
@app.route("/cadastrar-usuario", methods=["POST"])
def cadastrarUsuario(): # Função que executa o cadastro
    cpf = request.form.get('cpf')
    nome = request.form.get('nome')
    email = request.form.get('email')
    senha = request.form.get('senha')
    foto = request.files.get('foto')
    sn = request.form.get('sn')
    id_funcao = int(request.form.get('id_funcao'))

    if foto:
        link_arquivo_foto = upload_file(foto)
    else:
        link_arquivo_foto = None

    print(id_funcao)

    if id_funcao >= 2 and id_funcao <= 7:
        permissao = "solicitante"
    elif id_funcao == 1:
        permissao = "manutencao"

    myBD = Connection.conectar()

    mycursor = myBD.cursor()

    mycursor.execute(f"SELECT nome FROM tb_funcoes WHERE id_funcao = {id_funcao}")

    funcao = mycursor.fetchone()

    usuario = Usuario()

    if usuario.cadastrar(cpf, nome, email, senha, sn, link_arquivo_foto, permissao, id_funcao):
        session["usuario"] = {"CPF":cpf ,"nome":nome,"sn":sn, "foto":link_arquivo_foto, "funcao":funcao[0],"permissao":permissao}

        return jsonify({'mensagem':'Cadastro OK'}), 200
    else:
        return {'mensagem':'ERRO'}, 500

# Criando a rota para a tela de login
@app.route("/RF002")
def pg_login(): # Função que renderiza a tela de login
    if "usuario" in session:
        permissao = session["usuario"]["permissao"]

        if permissao == "administrador":
            return redirect("/tl-administrador")
        elif permissao == "manutencao":
            return redirect("/RF006")
        elif permissao == "solicitante":
            return redirect("/RF003")
    else:
        return render_template("RF002-log.html")

# Criando rota para realizar o login
@app.route("/realizar-login", methods=["POST"])
def realizar_login(): # Função que executa o login
    usuario = Usuario()

    dados = request.get_json()
    sn = dados["sn"]
    senha = dados["senha"]

    usuario.logar(sn, senha)

    if usuario.logado:
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        try:
            mycursor.execute(f"SELECT nome FROM tb_funcoes WHERE id_funcao = {usuario.id_funcao}")
            funcao = mycursor.fetchone()
            login = True
        except:
            login = False

        if login:
            session["usuario"] = {"CPF":usuario.cpf, "nome":usuario.nome, "sn":sn, "foto":usuario.foto,"funcao":funcao[0], "permissao":usuario.permissao}
        else:
            session["usuario"] = {"CPF":usuario.cpf, "nome":usuario.nome, "sn":sn, "foto":usuario.foto,"funcao":"Administrador", "permissao":usuario.permissao}

        return jsonify({'permissao':session["usuario"]["permissao"]}), 200
    else:
        session.clear()
        return {'mensagem':'ERRO'}, 500

# Criando rota para a tela de solicitacao
@app.route("/RF003")
def pg_solicitacao(): # Função que abre a tela de fazer solicitação
    funcao = session["usuario"]["funcao"]
    foto = session["usuario"]["foto"]
    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("RF003-solic.html", campo_nome = primeiro_ultimo_nome, campo_funcao = funcao, campo_foto = foto)

# Criando rota para a função que executa a solicitação
@app.route("/fazer_solicitacao", methods=["POST"])
def fazer_solicitacao(): # Função que executa a solicitação
    id_servico = request.form.get('id_servico')
    id_sala = request.form.get('id_sala')
    descricao = request.form.get('descricao')
    foto = request.files.get('foto')
    cpf = session["usuario"]["CPF"]

    if foto:
        link_arquivo_foto = upload_file(foto)
    else:
        link_arquivo_foto = None

    solicitacao = Solicitacao()

    if solicitacao.solicitar_servico(id_servico, id_sala, descricao, cpf, link_arquivo_foto):
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

# Criando rota para a tela em que o administrador recebe as solicitações
@app.route("/RF004",methods=["GET"])
def pg_ADM_recebe_solicitacao(): # Função que renderiza a tela em que o administrador recebe as solicitações
    # id_solicitacao=request.args.get(servico)
    servico = Solicitacao()
    recebimento = servico.recebimento_solicitacoes()

    funcao = session["usuario"]["funcao"]
    foto = session["usuario"]["foto"]

    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("RF004-ADMrecbSolic.html", campo_recebimento = recebimento, campo_nome = primeiro_ultimo_nome, campo_funcao = funcao, campo_foto = foto)

# Criando rota que retorna as solicitações
@app.route("/retorna-solicitacoes")
def mostrar_solicitacoes(): # Função que retorna as solicitações
    servico = Solicitacao()
    solicitacoes = servico.recebimento_solicitacoes()
    return jsonify(solicitacoes), 200

# Criando rota para os detalhes da solicitação
@app.route('/RF004A/<rowid>')
def pg_ver_solicitacao(rowid): # Função que renderiza a tela de detalhes da solicitação
     saibamais=Solicitacao()
     detalhes = saibamais.recebimento_solicitacao(id_solicitacao=rowid)

     print(detalhes)

     return render_template("RF004A-detlSolic.html", campo_sala = detalhes[2], campo_servico = detalhes[1], campo_nome_solicitante = detalhes[4], campo_funcao_solicitante = detalhes[5], campo_descricao = detalhes[3], campo_id_solicitacao = detalhes[0], campo_foto = detalhes[6])

@app.route("/deletar-solicitacao/<id_solicitacao>")
def deletarSolicitacao(id_solicitacao):
    solicitacao = Solicitacao()
    if solicitacao.deletar_solicitacao(id_solicitacao):
        return jsonify({'mensagem':'Cadastro OK'}), 200
    else:
        return {'mensagem':'ERRO'}, 500

# Criando rota para a tela de encaminhamento das solicitações
@app.route("/RF005/<id_solicitacao>")
def pg_encaminhar_solicitacao(id_solicitacao): # Função que renderiza a tela de encaminhamento das solicitações
    funcao = session["usuario"]["funcao"]
    foto = session["usuario"]["foto"]
    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("RF005-encamSolic.html", campo_id_solicitacao = id_solicitacao, campo_nome = primeiro_ultimo_nome, campo_funcao = funcao, campo_foto = foto)

# Criando rota para efetuar o encaminhamento
@app.route("/realizar-encaminhamento", methods=["POST"])
def realizar_encaminhamento(): # Função para realizar o encaminhamento
    dados = request.get_json()
    id_solicitacao = dados["id_solicitacao"]
    CPF_funcionario = dados["CPF_funcionario"]
    prioridade = dados["prioridade"]

    encaminhamento = Encaminhamento()

    if encaminhamento.realizar_encaminhamento(id_solicitacao, CPF_funcionario, prioridade):
        return jsonify({'mensagem':'Encaminhamento OK'}), 200
    else:
        return {'mensagem':'ERRO'}, 500

# Criando rota para a tela que retorna funcionários
@app.route("/RF005-retorna-funcionarios")
def retorna_funcionarios(): # Função que retorna todos os funcionários da manutenção
    encaminhamento = Encaminhamento()
    retorna_funcionario = encaminhamento.mostra_funcionarios()
    print(retorna_funcionario)
    return jsonify(retorna_funcionario), 200

# Criando a rota para a tela inicial dos técnicos da manutenção
@app.route("/RF006")
def pg_manutencao(): # Função que renderiza a tela inicial dos técnicos da manutenção
    funcao = session["usuario"]["funcao"]
    foto = session["usuario"]["foto"]
    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("RF006-TLmanuten.html", campo_nome = primeiro_ultimo_nome, campo_funcao = funcao, campo_foto = foto)

# Criando a rota que retorna todos os encaminhamentos
@app.route("/retorna-encaminhamentos")
def retorna_encaminhamentos(): # Função que retorna todos os encaminhamentos
    encaminhamento = Encaminhamento()

    cpf = session["usuario"]["CPF"]

    status = 'à fazer'

    retorna_encaminhamentos_pendentes = encaminhamento.mostrar_encaminhamentos(status, cpf)

    status = 'fazendo'

    retorna_encaminhamentos_fazendo = encaminhamento.mostrar_encaminhamentos(status, cpf)

    return jsonify([retorna_encaminhamentos_fazendo, retorna_encaminhamentos_pendentes])

# Criando rota para a tela coms os detalhes do encaminhamento
@app.route("/RF006A/<id_solicitacao>/<id_encaminhamento>")
def pg_ver_encaminhamento(id_solicitacao, id_encaminhamento): # Função que renderiza a tela de detalhes do encaminhamento
    saibamais=Solicitacao()
    detalhes = saibamais.recebimento_solicitacao(id_solicitacao)

    myBD = Connection.conectar()

    mycursor = myBD.cursor()

    mycursor.execute(f"SELECT urgencia FROM tb_encaminhamentos WHERE id_encaminhamento = {id_encaminhamento}")

    urgencia = mycursor.fetchone()

    print(detalhes)

    return render_template("RF006A-aceitaSolic.html", campo_sala = detalhes[2], campo_servico = detalhes[1], campo_nome_solicitante = detalhes[4], campo_funcao_solicitante = detalhes[5], campo_descricao = detalhes[3], campo_id_solicitacao = detalhes[0], campo_id_encaminhamento = id_encaminhamento, campo_urgencia = urgencia[0])

# Criando a rota para iniciar o serviço
@app.route("/iniciar-servico/<id_encaminhamento>")
def iniciar_servico(id_encaminhamento): # Função que inicia o serviço
    encaminhamento = Encaminhamento()

    cpf_funcionario = session["usuario"]["CPF"]

    retorno = encaminhamento.aceitar_encaminhamento(id_encaminhamento, cpf_funcionario)

    if retorno == 'Você só pode fazer um serviço por vez!':
        return 'Você só pode fazer um serviço por vez!', 500
    elif retorno:
        return jsonify({'mensagem':'Encaminhamento OK'}), 200
    else:
        return 'Erro ao iniciar serviço!', 500

@app.route("/RF007/<id_encaminhamento>", methods=["GET"])
def pg_manutencao_confirmacao_get(id_encaminhamento):
    foto = session["usuario"]["foto"]
    nome_completo = session["usuario"]["nome"]

    # Dividindo o nome em partes
    partes_nome = nome_completo.split()

    # Verificando se o nome tem mais de uma parte
    if len(partes_nome) > 1:
        primeiro_ultimo_nome = f"{partes_nome[0]} {partes_nome[-1]}"
    else:
        # Caso o nome tenha apenas uma parte, retorna somente essa parte
        primeiro_ultimo_nome = partes_nome[0]

    return render_template("RF007-manutConfirm.html",campo_id_encaminhamento=id_encaminhamento, campo_foto = foto,campo_nome = primeiro_ultimo_nome)

@app.route("/RF007", methods=["POST"])
def pg_manutencao_confirmacao_post():
    id_encaminhamento= request.form.get("id_solicitacao")
    adendo= request.form.get("adendo")
    opcao= request.form.get("opcao")
    finaliza=Encaminhamento()
    finaliza.finalizacao_encaminhamento(id_encaminhamento, adendo, opcao)

    return render_template("RF007-manutConfirm.html")

@app.route("/RF008")
def pg_fim_chamado():
    fim_chamado = Encaminhamento()
    finalizando = fim_chamado.mostrar_encaminhamentos_finalizacao()
    return render_template("RF008-fimchamado.html", encaminhamento=finalizando)

@app.route("/RF008A/<id_encaminhamento>")
def pg_detalhes_finalizacao(id_encaminhamento):
    encaminhamento = Encaminhamento()
    detalhes_ecaminhamento = encaminhamento.mostrar_detalhes_encaminhamento(id_encaminhamento)
    return render_template("RF008A-mais.html", campo_detalhes_encaminhamento = detalhes_ecaminhamento)

@app.route("/RF009")
def pg_relatorio():
    return render_template("RF009-relatorio.html")

# Criando rota para sair da conta
@app.route("/logout")
def logoff(): # Função que sai da conta do usuário
    session.clear()
    return redirect("/")

#Rodando o WebService
app.run(debug=True)
