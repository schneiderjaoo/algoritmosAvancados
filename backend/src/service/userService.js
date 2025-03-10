import Usuario from '../models/Usuario.js';

const criarUsuario = async (req, res) => {
    try {
        console.log('chamei o criar usuario!');
        const { nome_usuario, email, senha_hash } = req.body;
        if (!nome_usuario || !email || !senha_hash) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }

        const usuario = await Usuario.createUsuario(nome_usuario, email, senha_hash);
        res.status(201).json(usuario);
    } catch (e) {
        console.error('Erro ao criar usuário:', e);
        res.status(500).json({ message: 'Erro interno ao criar usuário' });
    }
};

export default { criarUsuario };
