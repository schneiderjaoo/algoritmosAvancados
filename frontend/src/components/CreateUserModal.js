import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const chaveSecreta = "teste-front";

function CreateUserModal({ isOpen, onRequestClose }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/usuario/criar', {
        nome_usuario: nomeUsuario,
        senha_hash: CryptoJS.AES.encrypt(senha, chaveSecreta).toString(),
        email: email,
      });
      onRequestClose();
      setNomeUsuario("");
      setSenha("");
      setEmail("");
      setErro("");
    } catch (error) {
      // setErro(error.response.data.mess);
      setErro(error.response ? error.response.data.message : "Erro desconhecido.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ModalOverlay" onClick={onRequestClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Criar Usuário</h2>
        {erro && <p className="ModalError">{erro}</p>}
        <form onSubmit={handleSubmit}>
          <div className="InputContainer">
            <input
              type="text"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
              className="ModalInput"
            />
            <label className={nomeUsuario ? "active" : ""}>Nome de Usuário</label>
          </div>
          <div className="InputContainer">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="ModalInput"
            />
            <label className={senha ? "active" : ""}>Senha</label>
          </div>
          <div className="InputContainer">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="ModalInput"
            />
            <label className={email ? "active" : ""}>Email</label>
          </div>
          <button type="submit" className="ModalButton ModalButtonCreate">
            Criar
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="ModalButton ModalButtonCancel"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserModal;
