import axios from "axios";

const API_URL = "http://localhost:3000/api"; 

const gerarTeclado = async () => {
  return axios.get(`${API_URL}/teclado`);
};

const resetarTentativas = async () => {
  return axios.post(`${API_URL}/teclado/resetar`);
};

export default { gerarTeclado, resetarTentativas };
