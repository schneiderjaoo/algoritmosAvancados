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

  useEffect(() => {
    gerarTeclado();
  }, []);

  const gerarTeclado = async () => {
    try {
      const response = await tecladoService.gerarTeclado();
      setTeclado(response.data);
    } catch (err) {
      setErro("Erro ao carregar teclado");
    }
  };

  const acessarSistema = async () => {
    try {
      const senhaCriptografada = CryptoJS.AES.encrypt(senha, chaveSecreta).toString();
      const response = await tecladoService.acessarSistema(senhaCriptografada, usuario);
      localStorage.setItem("token", response.data.token);
      console.log("Token: ", response.data.token);
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
