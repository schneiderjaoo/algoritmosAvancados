import React, { useState, useEffect } from "react";
import TecladoButton from "./TecladoButton";
import { FaBackspace } from "react-icons/fa";

function Teclado({ teclas, setSenha, resetSenha }) {
  const [valorDigitado, setValorDigitado] = useState("");

  useEffect(() => {
    if (resetSenha) {
      setValorDigitado(""); 
    }
  }, [resetSenha]); 

  const handleClick = (value) => {
    const novoValor = valorDigitado + value;
    setValorDigitado(novoValor.replace(",", ""));
    setSenha(novoValor.replace(",", ""));
  };

  const handleClear = () => {
    setValorDigitado("");  
    setSenha("");          
  };

  return (
    <div className="teclado-container">
      <div className="display">
        <input
          type="password"
          value={valorDigitado}
          readOnly
          className="display-input"
          placeholder="Digite os números"
        />
      </div>
      <div className="teclado">
        {teclas.map((tecla, index) => (
          <TecladoButton
            key={index}
            label={tecla.label}
            value={tecla.value}
            onClick={handleClick}
          />
        ))}
        
        <button className="teclado-button apagar" onClick={handleClear}>
          <FaBackspace /> CE
        </button>
      </div>
    </div>
  );
}

export default Teclado;
