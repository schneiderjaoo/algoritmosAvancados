import express from "express";
import usuarioService  from "../service/userService.js";

const { criarUsuario } = usuarioService;

const router = express.Router();

router.post("usuarios", criarUsuario);

export default router;
