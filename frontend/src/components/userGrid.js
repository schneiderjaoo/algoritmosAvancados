import React from "react";

function UserGrid({ usuario, setUsuario }) {
  return (
    <div className="user-grid">
      <input
        type="text"
        value={usuario} 
        onChange={(e) => setUsuario(e.target.value)} 
        placeholder="Usuário"
        aria-label="Usuário"
        autoComplete="off"
      />
    </div>
  );
}

export default UserGrid;
