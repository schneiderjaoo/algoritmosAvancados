import express from "express";
import tecladoService from "../service/tecladoService.js";

const { gerarTeclado, resetarTentativas } = tecladoService;

const router = express.Router();

router.get("/teclado", gerarTeclado);
router.post("/teclado/resetar", resetarTentativas);

export default router;
