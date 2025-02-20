class Teclado {
    static gerarTeclado() {
        let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        // Embaralhar os números, o 0,5 faz com que nas saidas negativas sejam embaralhados
        numeros.sort(() => Math.random() - 0.5);

        let teclas = [];

        for (let i = 0; i < 5; i++) {
            let n1 = numeros[i * 2];
            let n2 = numeros[i * 2 + 1];

            teclas.push({
                label: `${n1} ou ${n2}`,
                value: `${n1}, ${n2}`,
            });
        }
        return teclas;
    }
}

module.exports = Teclado;