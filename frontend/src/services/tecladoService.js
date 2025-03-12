import axios from "axios";

const API_URL = "http://localhost:3001/api"; 

const gerarSessionId = async () => {
  return axios.get(`${API_URL}/session`);
};

const gerarTeclado = async (sessionId) => {
  return axios.get(`${API_URL}/teclado`, { headers: { "Session-ID": sessionId } });
};

const acessarSistema = async (senha, usuario) => {
  const sessionId = localStorage.getItem("sessionId");

  return axios.post(`${API_URL}/teclado/acessar`, { senha, usuario }, { headers: { "Session-ID": sessionId } });
};

export default { gerarSessionId, gerarTeclado, acessarSistema };
 