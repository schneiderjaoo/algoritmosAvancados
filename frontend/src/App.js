import React, { useEffect, useState } from "react";
import Teclado from "./components/Teclado";
import AcessButton from "./components/AcessButton";
import CreateUserButton from "./components/CreateUserButton";
import tecladoService from "./services/tecladoService";
import logo from "../src/resources/catolica.png";
import CreateUserModal from "./components/CreateUserModal";
import UserGrid from "./components/userGrid";
import CryptoJS from "crypto-js";

const chaveSecreta = "teste-front";

function App() {
  const [teclado, setTeclado] = useState([]);
  const [erro, setErro] = useState("");
  const [senha, setSenha] = useState("");
  const [resetSenha, setResetSenha] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    gerarSessionId();
  }, []);

  useEffect(() => {
    if (sessionId) {
      gerarTeclado();
    }
  }, [sessionId]); 

  const gerarSessionId = async () => {
    try {
      const response = await tecladoService.gerarSessionId(); 
      setSessionId(response.data.sessionId); 
      localStorage.setItem("sessionId", response.data.sessionId);
    } catch (err) {
      setErro("Erro ao obter Session ID");
    }
  };

  const gerarTeclado = async () => {
    try {
      const response = await tecladoService.gerarTeclado(sessionId);
      setTeclado(response.data);
    } catch (err) {
      setErro(err.response ? err.response.data.message : "Erro desconhecido.");
    }
  };

  const acessarSistema = async () => {
    try {
      const senhaCriptografada = CryptoJS.AES.encrypt(senha, chaveSecreta).toString();
      const response = await tecladoService.acessarSistema(senhaCriptografada, usuario, sessionId);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("sessionId", response.data.sessionId);
      console.log("Token: ", response.data.token);
      console.log("Session ID: ", response.data.sessionId);
      setErro("");
      alert(response.data.message);
    } catch (err) {
      gerarTeclado();
      setSenha("");
      setResetSenha(true);
      setErro(err.response ? err.response.data.message : "Erro desconhecido.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <h1>Teclado Virtual</h1>
      <UserGrid usuario={usuario} setUsuario={setUsuario} />
      {erro && <p className="error-message">{erro}</p>}
      <Teclado teclas={teclado} setSenha={setSenha} resetSenha={resetSenha} />
      
      <div className="button-container">
        <AcessButton onAcess={acessarSistema} />
        <CreateUserButton onAcess={() => setIsModalOpen(true)} />
      </div>
      
      <CreateUserModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      <img src={logo} alt="Católica SC" className="logo"/>
    </div>
  );
  
}

export default App;
