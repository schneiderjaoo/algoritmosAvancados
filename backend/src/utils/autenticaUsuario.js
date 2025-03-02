import validaSenha from "../utils/validaSenha.js";
import connectDB from "../config/dbconfig.js";

async function autenticarUsuario(email, senhaDigitada) {
    const db = await connectDB();

    try {
        const res = await db.query(`SELECT senha_hash FROM usuarios WHERE email = $1`, [email]);

        if (res.rows.length === 0) {
            console.log("Usuário não encontrado!");
            return false;
        }

        const senhaHash = res.rows[0].senha_hash;

        if (await validaSenha.compararSenha(senhaDigitada, senhaHash)) {
            console.log("Login Bem-sucedido!");
            return true;
        } else {
            console.log("Senha incorreta!");
            return false;
        }
    } catch (err) {
        console.error("Erro ao autenticar:", err);
        return false;
    } finally {
        db.end();
    }
}

export default autenticarUsuario;
