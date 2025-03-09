import Usuario from '../models/Usuario.js';

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }

        const usuario = await Usuario.createUsuario(nome, email, senha);
        res.status(201).json(usuario);
    } catch (e) {
        console.error('Erro ao criar usuário:', e);
        res.status(500).json({ message: 'Erro interno ao criar usuário' });
    }
};

export default { criarUsuario };
