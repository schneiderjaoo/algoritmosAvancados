import React, { useState } from "react";
import TecladoButton from "./TecladoButton";

function Teclado({ teclas }) {
  const [valorDigitado, setValorDigitado] = useState("");

  const handleClick = (value) => {
    setValorDigitado(valorDigitado + value);
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
