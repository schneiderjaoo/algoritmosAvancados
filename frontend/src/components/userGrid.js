import React, { useState } from "react";

function UserGrid() {
  const [username, setUsername] = useState("");

  return (
    <div className="user-grid">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite seu nome"
        aria-label="Nome de usuário"
        autoComplete="off"
      />
    </div>
  );
}

export default UserGrid;
