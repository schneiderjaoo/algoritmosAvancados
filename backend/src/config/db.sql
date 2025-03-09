CREATE TABLE usuarios (
    nome_usuario VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
    senha_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
/
--\dt se rodar no terminal vai poder ver as tabelas criadas


