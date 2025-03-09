import React, { useState } from "react";
import TecladoButton from "./TecladoButton";

function Teclado({ teclas, setSenha }) {
  const [valorDigitado, setValorDigitado] = useState("");

  const handleClick = (value) => {
    var novoValor = valorDigitado + value;  // Concatenando sem vírgulas
    novoValor = novoValor.replace(',', '');
    setValorDigitado(novoValor);
    setSenha(novoValor);  // Atualizando a senha sem vírgulas
  };

  return (
    <div className="teclado-container">
      <div className="display">
        <input
          type="text"
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
            onClick={() => handleClick(tecla.value)}  // Chamando a função de click
          />
        ))}
      </div>
    </div>
  );
}

export default Teclado;
