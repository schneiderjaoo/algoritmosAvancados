import React from "react";

function AcessButton({ onAcess }) {
  return (
    <button className="acess-button" onClick={onAcess}>
      Acessar
    </button>
  );
}

export default AcessButton;
