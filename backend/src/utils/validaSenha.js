import bcrypt from "bcrypt";

const validaSenha = {
    validarSenha: (senha) => /^\d{4}$/.test(senha),

    compararSenha: async (senhaDigitada, senhaHash) => {
        return await bcrypt.compare(senhaDigitada, senhaHash);
    }
};

export default validaSenha;