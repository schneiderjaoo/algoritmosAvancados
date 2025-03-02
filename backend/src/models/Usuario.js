import bcrypt from "bcrypt";
import connectDB from "../config/dbconfig";

async function createUsuario(nome, email, senha) {
    const db = await connectDB();

    //Valida se a senha tem 4 digitos
    if (!/^\d{4}$/.test(senha)) {
        console.error("ATENÇÃO! A senha deve ter 4 digitos numéricos.", err);
        return;
    }
    
    const saltRounds = 10; 
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const query = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)`;
    const values = [nome, email, senhaHash];

    try {
        const res = await db.query(query, values);
        console.log(`Usuario ${nome}, ${res.rows[0].id} criado com sucesso!`);
    } catch (err) {
        console.error("Erro ao inserir usuário:", err);
        throw err;
    } finally {
        db.end();
    }
}
