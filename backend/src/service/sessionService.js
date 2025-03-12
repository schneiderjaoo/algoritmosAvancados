import { v4 as uuidv4 } from "uuid";

const sessoesAtivas = new Map(); 

export const criarSession = () => {
    const sessionId = uuidv4(); 
    const expiracao = Date.now() + 30 * 60 * 1000;
    sessoesAtivas.set(sessionId, expiracao);
    return sessionId;
};

export const validarSession = (sessionId) => {
    const expiracao = sessoesAtivas.get(sessionId);

    if (!expiracao || Date.now() > expiracao) {
        sessoesAtivas.delete(sessionId); 
        return false;
    }

    return true;
};

export const encerrarSession = (sessionId) => {
    sessoesAtivas.delete(sessionId);
};
