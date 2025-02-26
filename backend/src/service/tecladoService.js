import Teclado from "../models/Teclado.js";

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
    console.log("vamos resetar essa porra");
    res.status(200).json({ message: "Tentativas resetadas" });
};

export default { gerarTeclado, resetarTentativas };
