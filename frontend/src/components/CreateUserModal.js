import React, { useState } from 'react';
import axios from 'axios';

function CreateUserModal({ isOpen, onRequestClose }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/usuarios', {
        nome_usuario: nomeUsuario,
        senha_hash: senha,
        email: email,
      });
      onRequestClose();
      setNomeUsuario('');
      setSenha('');
      setEmail('');
      setErro('');
    } catch (error) {
      setErro('Erro ao criar usuário');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ModalOverlay" onClick={onRequestClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Criar Usuário</h2>
        {erro && <p className="ModalError">{erro}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome de Usuário:</label>
            <input
              type="text"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
              className="ModalInput"
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="ModalInput"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="ModalInput"
            />
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
