class Teclado {
    static tentativas = 0;
    static teclas = [];

    static gerarTeclado() {
        if (this.tentativas >= 3) {
            this.tentativas = 0;
            return this.embaralharTeclas();
        }

        this.tentativas++; 
        return this.teclas;
    }

    static embaralharTeclas() {
        let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        numeros.sort(() => Math.random() - 0.5);

        let teclas = [];

        for (let i = 0; i < 5; i++) {
            let n1 = numeros[i * 2];
            let n2 = numeros[i * 2 + 1];

            teclas.push({
                label: `${n1} ou ${n2}`,
                value: `${n1},${n2}`,
            });
        }

        this.teclas = teclas;
        return teclas;
    }
}

Teclado.teclas = Teclado.embaralharTeclas();

export default Teclado;
