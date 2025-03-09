import bcrypt from 'bcrypt';
import connectDB from '../config/dbconfig.js';

const saltRounds = 10;

async function createUsuario(nome, email, senha) {
    const db = await connectDB();

    if (!/^\d{4}$/.test(senha)) {
        throw new Error('A senha deve ter 4 dígitos numéricos.');
    }

    const senhaHash = await bcrypt.hash(senha, saltRounds);
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
    const values = [nome, email, senhaHash];

    try {
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (err) {
        throw new Error('Erro ao inserir usuário: ' + err.message);
    } finally {
        db.end();
    }
}

export default { createUsuario };//se for criar mais funcoes pode ir jogando aqui o export delas :D
