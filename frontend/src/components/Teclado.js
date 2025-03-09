import React, { useState, useEffect } from "react";
import TecladoButton from "./TecladoButton";

function Teclado({ teclas, setSenha, resetSenha }) {
  const [valorDigitado, setValorDigitado] = useState("");

  useEffect(() => {
    if (resetSenha) {
      setValorDigitado(""); // Limpa o campo
    }
  }, [resetSenha]); // Sempre que `resetSenha` mudar, o campo será resetado

  const handleClick = (value) => {
    const novoValor = valorDigitado + value;
    setValorDigitado(novoValor.replace(",", ""));
    setSenha(novoValor.replace(",", ""));
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
      </div>
    </div>
  );
}

export default Teclado;
