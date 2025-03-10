import bcrypt from 'bcrypt';
import crypto from 'crypto';
import connectDB from '../config/dbconfig.js';

const saltRounds = 10;
const chaveSecreta = 'teste';

async function createUsuario(nome, email, senha) {
    console.log('vamos salvar agora');
    const db = await connectDB();

    if (!/^\d{4}$/.test(senha)) {
        throw new Error('A senha deve ter 4 dígitos numéricos.');
    }

    const senhaHash = await bcrypt.hash(senha, saltRounds);
    const senhaHash2 = criptografar(senha);
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
    const values = [nome, email, senhaHash2];

    try {
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (err) {
        throw new Error('Erro ao inserir usuário: ' + err.message);
    } finally {
        db.end();
    }
}

async function buscaUsuario(nome) {
    console.log('vamos buscar o usuário');
    const db = await connectDB();

    const query = 'SELECT nome, senha FROM usuarios WHERE nome = $1';
    const values = [nome];

    try {
        const res = await db.query(query, values);
        
        if (res.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const usuario = res.rows[0];
        return {
            senha: usuario.senha
        };
    } catch (err) {
        throw new Error('Erro ao buscar usuário: ' + err.message);
    } finally {
        db.end();
    }
}

function criptografar(senha) {
    const iv = crypto.randomBytes(16); 
    const chaveDerivada = crypto.createHash('sha256').update(chaveSecreta).digest(); 

    const cipher = crypto.createCipheriv('aes-256-cbc', chaveDerivada, iv); 

    let criptografado = cipher.update(senha, 'utf8', 'hex');
    criptografado += cipher.final('hex');

    return iv.toString('hex') + ':' + criptografado;
}

function descriptografar(senhaCriptografada) {
    console.log("Vamos descriptogravar");
    const partes = senhaCriptografada.split(':');
    const iv = Buffer.from(partes[0], 'hex');
    const criptografado = partes[1];

    const chaveDerivada = crypto.createHash('sha256').update(chaveSecreta).digest(); 

    const decipher = crypto.createDecipheriv('aes-256-cbc', chaveDerivada, iv); 

    let senhaDescriptografada = decipher.update(criptografado, 'hex', 'utf8');
    senhaDescriptografada += decipher.final('utf8');

    return senhaDescriptografada;
}

export default { createUsuario, buscaUsuario, criptografar, descriptografar };