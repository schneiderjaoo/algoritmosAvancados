import React from "react";

function CreateUserButton({ onAcess }) {
  return (
    <button className="acess-button" onClick={onAcess}>
      Criar usuário
    </button>
  );
}

export default CreateUserButton;
