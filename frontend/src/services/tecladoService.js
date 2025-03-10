import axios from "axios";

const API_URL = "http://localhost:3000/api"; 

const gerarTeclado = async () => {
  return axios.get(`${API_URL}/teclado`);
};

const acessarSistema = async (senha, usuario) => {
  return axios.post(`${API_URL}/teclado/acessar`, { senha, usuario });
};

export default { gerarTeclado, acessarSistema };
 