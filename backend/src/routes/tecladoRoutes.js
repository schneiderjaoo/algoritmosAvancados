import express from "express";
import tecladoService from "../service/tecladoService.js";

const { gerarTeclado, resetarTentativas, acessar } = tecladoService;

const router = express.Router();

router.get("/teclado", gerarTeclado);
router.post("/teclado/resetar", resetarTentativas);
router.post("/teclado/acessar", acessar);

export default router;
