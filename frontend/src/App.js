import React, { useEffect, useState } from "react";
import Teclado from "./components/Teclado";
import AcessButton from "./components/AcessButton";
import tecladoService from "./services/tecladoService";
import logo from '../src/resources/catolica.png'; 

function App() {
  const [teclado, setTeclado] = useState([]);
  const [erro, setErro] = useState("");
  const [senha, setSenha] = useState("");

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

  // const acessarSistema = async () => {
  //   try {
  //     await tecladoService.acessarSistema();
  //     setErro("");
  //     gerarTeclado();
  //   } catch (err) {
  //     setErro("Erro ao tentar acessar o sistema");
  //   }
  // };
  const acessarSistema = async (senha) => {
    try {
      console.log("Enviando senha: ", senha);
      const response = await tecladoService.acessarSistema(senha);
      setErro("");
      gerarTeclado();
      alert(response.data.message);
    } catch (err) {
      setErro("Erro ao tentar acessar o sistema");
    }
  };

  return (
    <div className="App">
      <h1>Teclado Virtual</h1>
      {erro && <p className="error-message">{erro}</p>}
      <Teclado teclas={teclado} setSenha={setSenha} senha={senha}/>
      <AcessButton onAcess={() => acessarSistema(senha)} />

      <img src={logo} alt="Católica SC" className="logo"/>
    </div>
  );
}

export default App;
