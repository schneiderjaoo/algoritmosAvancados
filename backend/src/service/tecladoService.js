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

// const acessar = (req, res) => {
//     console.log('Recebendo requisição...');
//     const { senha } = req.body;

//     console.log("Recebi a senha: ", senha);

//     if (senha === senhaFixa) {
//         res.status(200).json({ message: "Acesso concedido!" });
//     } else {
//         res.status(400).json({ message: "Acesso negado!" });
//     }
// };

const acessar = (req, res) => {
    console.log('Recebendo requisição...');
    const { senha } = req.body; // Senha digitada pelo usuário
    
    console.log("Recebi a senha: ", senha);

    // Mapeando a senha fixa para uma lista de teclas possíveis
    const teclas = {
        '1': ['1', '2'],
        '2': ['3', '4'],
        '3': ['5', '6'],
        '4': ['7', '8'],
        '5': ['9', '0'],
    };

    // Função para verificar se a senha digitada é válida
    const validarSenha = (senhaDigitada) => {
        let senhaDigitadaArray = senhaDigitada.split('');
        
        // Verifica se cada número digitado pertence ao conjunto de números válidos para a tecla correspondente
        for (let i = 0; i < senhaDigitadaArray.length; i++) {
            const digito = senhaDigitadaArray[i];
            const tecla = senhaFixa[i]; // Pega a tecla correspondente na senha fixa

            // Se o número digitado não pertence à tecla correspondente, a senha é inválida
            if (!teclas[tecla] || !teclas[tecla].includes(digito)) {
                return false;
            }
        }

        return true;
    };

    // Verifica a senha digitada
    if (validarSenha(senha)) {
        res.status(200).json({ message: "Acesso concedido!" });
    } else {
        console.log('deu ruim');
        res.status(400).json({ message: "Acesso negado!" });
    }
};


export default { gerarTeclado, resetarTentativas, acessar };
