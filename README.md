# Teclado Virtual para Sites

## Descrição do Desafio

O objetivo deste desafio é implementar um teclado virtual que aumenta a segurança na digitação de senhas, dificultando ataques por observação visual. O sistema embaralha os números apresentados e permite que o usuário selecione os dígitos por meio de botões com múltiplas opções.

## Requisitos do Projeto

### Funcionalidades Principais
- O teclado deve exibir botões onde cada um contém duas opções de dígitos.
- A ordem dos botões e os pares de números devem ser gerados dinamicamente para cada sessão.
- O frontend deve solicitar um ID de sessão ao servidor para montar o teclado.
- As informações trafegadas entre frontend e backend devem ser protegidas contra interceptação.
- A validação da senha deve ocorrer no backend, invalidando a sessão após cada tentativa.
- Garantia de que um ID de sessão não seja reutilizado antes de pelo menos 1000 novas sessões.

### Tecnologias Utilizadas
- **Frontend:** React.js
- **Backend:** Node.js
- **Banco de Dados:** Postgres
- **Criptografia:** CryptoJS

## Estrutura do Projeto

```
📁 teclado-virtual
├── 📂 backend
│   ├── 📂 coverage
│   ├── 📂 node_modules
│   ├── 📂 src
│   ├── 📂 test
├── 📂 frontend
│   ├── 📂 build
│   ├── 📂 node_modules
│   ├── 📂 public
│   ├── 📂 src
│   │   ├── 📂 components
│   │   ├── 📂 resources
│   │   ├── 📂 services
└── README.md   
```

## Configuração e Execução

### Backend
1. Instale as dependências:
   ```sh
   npm install  # precisa ser o Node 16.20.2
   ```
2. Execute o servidor de desenvolvimento:
   ```sh
   npm run build
   ```
3. Execute o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

### Frontend
1. Instale as dependências:
   ```sh
   npm install  # precisa ser o Node 16.20.2
   ```
2. Execute o servidor de desenvolvimento:
   ```sh
   npm run build
   ```
3. Execute o servidor de desenvolvimento:
   ```sh
   npm run start
   ```

## Banco de Dados
- Criar a estrutura no Postgres
- Executar os scripts de migração (`db.sql`) #Está dentro do backend/src/config

## Observação
- Lembrando que é necessário abrir dois terminais no vscode, um deve-se realizar o cd backend -> npm install -> comandos para execução e no outro terminal cd frontend -> npm install -> comandos para execução

## Regras 
- Senha sempre é enviado criptografado para o backend
- Senha sempre é salva criptografada no banco de dados
- ID de Sessão é gerado ao abrir o site e possui tempo de expiração sempre que é executado uma ação validamos o ID e geramos outro
- Ao validar usuário geramos um token.
