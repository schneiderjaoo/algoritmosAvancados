import pg from "pg";

const { Client } = pg;

const dbConfig = {
    user: '',
    host: 'localhost',
    database: 'bancoAlgoritmos',
    password: '',
    port: 5432,
};

async function connectDB() {
    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log("Conectado ao PostgreSQL!");
        return client;
    } catch (err) {
        console.error("Erro ao conectar ao banco:", err);
        throw err;
    }
}

export default connectDB;