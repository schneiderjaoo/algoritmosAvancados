import Teclado from "../src/models/Teclado.js"; 
import { jest } from "@jest/globals"; 

describe("Teclado Service", () => {
    test("Deve gerar um teclado corretamente", () => {
        const teclado = Teclado.gerarTeclado();
        expect(teclado).toHaveLength(5); 
        teclado.forEach(tecla => {
            expect(tecla).toHaveProperty("label");
            expect(tecla).toHaveProperty("value");
        });
    });

    test("Deve resetar as tentativas corretamente", () => {
        Teclado.tentativas = 3;
        Teclado.gerarTeclado();  
        expect(Teclado.tentativas).toBe(0); 

        Teclado.tentativas = 0;
        expect(Teclado.gerarTeclado()).toEqual(Teclado.teclas);
    });

    test("Deve embaralhar teclas corretamente", () => {
        const teclas1 = Teclado.embaralharTeclas();
        const teclas2 = Teclado.embaralharTeclas();
        expect(teclas1).not.toEqual(teclas2);
    });
});
