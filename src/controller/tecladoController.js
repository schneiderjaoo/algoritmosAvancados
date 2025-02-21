const Teclado = required("../models/Teclado");

const gerarTeclado = (req, res) => {
    const teclado = Teclado.gerarTeclado();
    res.json(teclado);
}

module.exports = { getTeclado };