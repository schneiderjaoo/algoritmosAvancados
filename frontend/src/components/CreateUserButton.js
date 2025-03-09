import React from "react";

function CreateUserButton({ onAcess }) {
  return (
    <button className="createUser-button" onClick={onAcess}>
      Criar usuário
    </button>
  );
}

export default CreateUserButton;
