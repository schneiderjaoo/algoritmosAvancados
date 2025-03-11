import { createUsuario, buscaUsuario } from "../service/userService.js";
import connectDB from "../config/dbconfig.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

jest.mock("../config/dbconfig.js");

describe("Usuário Service", () => {
    const mockDb = {
        query: jest.fn()
    };
    
    beforeEach(() => {
        connectDB.mockResolvedValue(mockDb);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Deve criar um usuário com sucesso", async () => {
        const nome = "Teste";
        const email = "teste@example.com";
        const senha = "1234";
        const senhaHash = await bcrypt.hash(senha, 10); 
        const senhaCriptografada = crypto.createCipheriv('aes-256-cbc', Buffer.alloc(32), Buffer.alloc(16)).update(senha, 'utf8', 'hex');

        mockDb.query.mockResolvedValueOnce({
            rows: [{
                nome,
                email,
                senha: senhaCriptografada
            }]
        });

        const result = await createUsuario(nome, email, senha);

        expect(result).toHaveProperty("nome", nome);
        expect(result).toHaveProperty("email", email);
        expect(result.senha).not.toBe(senha); 
        expect(mockDb.query).toHaveBeenCalledWith(
            "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *", 
            [nome, email, senhaCriptografada]
        );
    });

    test("Deve lançar erro se a senha não for numérica de 4 dígitos", async () => {
        await expect(createUsuario("Teste", "teste@example.com", "12345")).rejects.toThrow(
            "A senha deve ter 4 dígitos numéricos."
        );
    });

    test("Deve buscar um usuário com sucesso", async () => {
        const nome = "Teste";
        const senhaCriptografada = "iv:crypted";  

        mockDb.query.mockResolvedValueOnce({
            rows: [{ nome, senha: senhaCriptografada }]
        });

        const result = await buscaUsuario(nome);

        expect(result).toHaveProperty("senha", senhaCriptografada);
        expect(mockDb.query).toHaveBeenCalledWith(
            "SELECT nome, senha FROM usuarios WHERE nome = $1", 
            [nome]
        );
    });

    test("Deve lançar erro ao buscar um usuário que não existe", async () => {
        const nome = "Inexistente";
        
        mockDb.query.mockResolvedValueOnce({ rows: [] });  

        await expect(buscaUsuario(nome)).rejects.toThrow("Usuário não encontrado");
    });

    test("Deve lançar erro ao tentar inserir usuário no banco de dados", async () => {
        const nome = "Teste";
        const email = "teste@example.com";
        const senha = "1234";
        const senhaCriptografada = crypto.createCipheriv('aes-256-cbc', Buffer.alloc(32), Buffer.alloc(16)).update(senha, 'utf8', 'hex');

        mockDb.query.mockRejectedValueOnce(new Error("Erro ao inserir no banco"));

        await expect(createUsuario(nome, email, senha)).rejects.toThrow("Erro ao inserir usuário: Erro ao inserir no banco");
    });
});
