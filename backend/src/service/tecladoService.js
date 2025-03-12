import bcrypt from 'bcrypt';
import Teclado from "../models/Teclado.js";
import Usuario from '../models/Usuario.js';
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { criarSession, encerrarSession, validarSession } from "../service/sessionService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const chaveSecreta = "teste-front";

let tentativasFalhas = {};

const gerarSession = (req, res) => {
    try {
        const sessionId = criarSession(); 
        res.status(200).json({ message: "Session ID Gerado!", sessionId });
    } catch (error) {
        console.error("Erro ao gerar session:", error);
        res.status(500).json({ message: "Erro interno ao gerar session" });
    }
};

const gerarTeclado = (req, res) => {
    try {
        const sessionId = req.headers["session-id"];

        console.log("Sessão ao gerar teclado: " + sessionId);

        if (!sessionId) {
            return res.status(401).json({ message: "Sessão inválida. Faça login novamente." });
        }

        if (!validarSession(sessionId)) {
            return res.status(403).json({ message: "Sessão expirada. Faça login novamente." });
        }

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

    const sessionId = req.headers["session-id"];

    if (!sessionId) {
        return res.status(401).json({ message: "Sessão inválida. Faça login novamente." });
    }

    console.log("Sessão: " + sessionId);

    if (!validarSession(sessionId)) {
        return res.status(403).json({ message: "Sessão expirada. Faça login novamente." });
    }

    const bytes = CryptoJS.AES.decrypt(senha, chaveSecreta);
    const senhaDescriptografada = bytes.toString(CryptoJS.enc.Utf8);

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

    if (validarSenha(senhaDescriptografada)) {
        tentativasFalhas[usuario] = 0;

        encerrarSession(sessionId);

        const newSessionId = criarSession();

        const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({ message: "Acesso concedido!", token, newSessionId });
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


export default { gerarSession, gerarTeclado, resetarTentativas, acessar };
