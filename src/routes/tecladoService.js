const express = require('express');
const router = express.Router();
const { getTeclado } = require('../services/tecladoService');

router.get('/', getTeclado);

module.exports = router;