CREATE TABLE usuarios (
    nome VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_criacao DATETIME
);
/
--\dt se rodar no terminal vai poder ver as tabelas criadas


