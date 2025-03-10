import bcrypt from 'bcrypt';
import Teclado from "../models/Teclado.js";
import Usuario from '../models/Usuario.js';

const saltRounds = 10;
let tentativasFalhas = {};

const gerarTeclado = (req, res) => {
    try {
        const teclado = Teclado.gerarTeclado();
        res.status(200).json(teclado);
    } catch (error) {
        console.error("Erro ao gerar teclado:", error);
        res.status(500).json({ message: "Erro interno ao gerar teclado" });
    }
};

const resetarTentativas = (req, res) => {
    Teclado.tentativas = 0;
    Teclado.embaralharTeclas();
    res.status(200).json({ message: "Tentativas resetadas" });
};

async function acessar (req, res) {
    console.log('Recebendo requisição...');
    var { senha, usuario } = req.body; 
  
    if (tentativasFalhas[usuario] && tentativasFalhas[usuario] >= 3) {
        return res.status(403).json({ message: "Usuário bloqueado. Tente novamente mais tarde." });
    }

    let senhaUsuario;
    try {
        senhaUsuario = (await Usuario.buscaUsuario(usuario)).senha;
    } catch (err) {
        return res.status(400).json({ message: "Usuário não encontrado." });
    }
  
    senhaUsuario = Usuario.descriptografar(senhaUsuario);

    const validarSenha = (senhaDigitada) => {
        if (senhaDigitada.length / 2 !== senhaUsuario.length) {
            return false;
        }

        if (senhaDigitada.length % 2 !== 0) {
            return false;
        }

        for (let i = 0; i < senhaUsuario.length; i++) {
            const digitoFixo = senhaUsuario[i];
            
            const parDigitado = senhaDigitada.substr(i * 2, 2);

            if (!parDigitado.includes(digitoFixo)) {
                return false;
            }
        }

        return true;
    };

    if (validarSenha(senha)) {
        tentativasFalhas[usuario] = 0;
        res.status(200).json({ message: "Acesso concedido!" });
    } else {
        if (!tentativasFalhas[usuario]) {
            tentativasFalhas[usuario] = 1;
        } else {
            tentativasFalhas[usuario]++;
        }
        Teclado.embaralharTeclas();
        if (tentativasFalhas[usuario] >= 3) {
            res.status(403).json({ message: "Usuário bloqueado. Tente novamente mais tarde." });
        } else {
            res.status(400).json({ message: "Acesso negado!" });
        }
    }
};


export default { gerarTeclado, resetarTentativas, acessar };
