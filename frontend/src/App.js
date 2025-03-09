import React, { useEffect, useState } from "react";
import Teclado from "./components/Teclado";
import AcessButton from "./components/AcessButton";
import CreateUserButton from "./components/CreateUserButton";
import tecladoService from "./services/tecladoService";
import logo from '../src/resources/catolica.png'; 
import CreateUserModal from "./components/CreateUserModal";

function App() {
  const [teclado, setTeclado] = useState([]);
  const [erro, setErro] = useState("");

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

  const resetarTentativas = async () => {
    try {
      await tecladoService.resetarTentativas();
      setErro("");
      gerarTeclado();
    } catch (err) {
      setErro("Erro ao resetar tentativas");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <h1>Teclado Virtual</h1>
      {erro && <p className="error-message">{erro}</p>}
      <Teclado teclas={teclado} />
      <AcessButton onAcess={resetarTentativas} />
      <CreateUserButton onAcess={openModal}/>
      <CreateUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
      <img src={logo} alt="Católica SC" className="logo"/>
    </div>
  );
}

export default App;
