import React from "react";

function TecladoButton({ label, value, onClick }) {
  return (
    <button className="teclado-button" onClick={() => onClick(value)}>
      <strong>{label}</strong>
    </button>
  );
}

export default TecladoButton;
