#Criar o Banco de Dados
CREATE DATABASE bd_easyrequest;

#Selecionar o banco de Dados a ser utilizado
USE bd_easyrequest;

#Criar usuário para acessar o Banco de Dados
CREATE USER 'equipe'@'%' IDENTIFIED BY '4_b4t@t45_3_m31@';
GRANT ALL PRIVILEGES ON bd_easyrequest.* TO 'equipe'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

#Criar tabela que armazena as funções
CREATE TABLE tb_funcoes (
 id_funcao INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL
);

#Criar tabela que armazena as salas
CREATE TABLE tb_salas (
 id_sala VARCHAR(10) PRIMARY KEY,
 nome_sala VARCHAR(100) NOT NULL,
 bloco VARCHAR(2) NOT NULL
);

#Criar a tabela que armazena os serviços
CREATE TABLE tb_servicos (
 id_servico INT PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(100) NOT NULL
);

#Criar a tabela que armazena os funcionários/ usuários do sistema
CREATE TABLE tb_funcionarios (
 CPF_funcionario VARCHAR(14) PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(255) NOT NULL,
 senha VARCHAR(255) NOT NULL,
 SN VARCHAR(9) NOT NULL,
 foto VARCHAR(2048),
 permissao VARCHAR(30) NOT NULL,
 id_funcao INT NOT NULL,
 CONSTRAINT FK_funcionarios_funcao FOREIGN KEY (id_funcao) REFERENCES tb_funcoes (id_funcao)
);

#Criar a tabela que armazena as solicitações de serviço
CREATE TABLE tb_solicitacoes (
 id_solicitacao INT PRIMARY KEY AUTO_INCREMENT,
 id_servico INT NOT NULL,
 id_sala VARCHAR(10) NOT NULL,
 descricao VARCHAR(2048) NOT NULL,
 CPF_funcionario VARCHAR(14) NOT NULL,
 CONSTRAINT FK_tb_solicitacoes_servicos FOREIGN KEY (id_servico) REFERENCES tb_servicos (id_servico),
 CONSTRAINT FK_tb_solicitacoes_sala FOREIGN KEY (id_sala) REFERENCES tb_salas (id_sala),
 CONSTRAINT FK_tb_solicitacoes_funcionario FOREIGN KEY (CPF_funcionario) REFERENCES tb_funcionarios (CPF_funcionario)
);

#Criar a tabela que armazena os serviços a serem realizados pelos técnicos
CREATE TABLE tb_encaminhamento (
 id_encaminhamento INT PRIMARY KEY AUTO_INCREMENT,
 CPF_funcionario VARCHAR(14) NOT NULL,
 id_solicitacao INT NOT NULL,
 urgencia VARCHAR(5) NOT NULL,
 status VARCHAR(12) NOT NULL,
 status_final VARCHAR(255),
 adendo VARCHAR(2048),
 CONSTRAINT FK_tb_encaminhamento_funcionario FOREIGN KEY (CPF_funcionario) REFERENCES tb_funcionarios (CPF_funcionario),
 CONSTRAINT FK_tb_encaminhamento_solicitacao FOREIGN KEY (id_solicitacao) REFERENCES tb_solicitacoes (id_solicitacao)
);

#Criar a tabela que armazena as Ordens de Serviço
CREATE TABLE tb_ordens_de_servico (
 id_os INT PRIMARY KEY AUTO_INCREMENT,
 id_encaminhamento INT NOT NULL,
 CONSTRAINT FK_tb_os_encaminhamento FOREIGN KEY (id_encaminhamento) REFERENCES tb_encaminhamento (id_encaminhamento)
);

INSERT INTO tb_funcoes (nome) VALUES ("Técnico de Manutenção"), ("Instrutor"), ("Secretaria"), ("OPP"), ("Coordenador"), ("Diretor"), ("Outros");
INSERT INTO tb_servicos (nome) VALUES ("Elétrica"), ("Hidráulica"), ("Pintura"), ("Alvenaria");

SELECT * FROM tb_funcoes;
SELECT * FROM tb_funcionarios;
SELECT * FROM tb_solicitacoes;
SELECT * FROM tb_servicos;
SELECT * FROM tb_salas;
SELECT * FROM tb_encaminhamento;