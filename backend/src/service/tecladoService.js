import Teclado from "../models/Teclado.js";

const senhaFixa = "1289";

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

const acessar = (req, res) => {
    console.log('Recebendo requisição...');
    const { senha } = req.body; 
    
    console.log("Senha fixa: ", senhaFixa);
    console.log("Recebi a senha: ", senha);

    const validarSenha = (senhaDigitada) => {
        if (senhaDigitada.length / 2 !== senhaFixa.length) {
            return false;
        }

        if (senhaDigitada.length % 2 !== 0) {
            return false;
        }

        for (let i = 0; i < senhaFixa.length; i++) {
            const digitoFixo = senhaFixa[i];
            
            const parDigitado = senhaDigitada.substr(i * 2, 2);

            if (!parDigitado.includes(digitoFixo)) {
                return false;
            }
        }

        return true;
    };

    if (validarSenha(senha)) {
        res.status(200).json({ message: "Acesso concedido!" });
    } else {
        console.log('Senha inválida');
        Teclado.embaralharTeclas();
        res.status(400).json({ message: "Acesso negado!" });
    }
};


export default { gerarTeclado, resetarTentativas, acessar };
