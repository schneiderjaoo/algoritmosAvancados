import express from "express";
import tecladoService from "../service/tecladoService.js";

const { gerarSession, gerarTeclado, resetarTentativas, acessar } = tecladoService;

const router = express.Router();

router.get("/session", gerarSession);
router.get("/teclado", gerarTeclado);
router.post("/teclado/resetar", resetarTentativas);
router.post("/teclado/acessar", acessar);

export default router;
