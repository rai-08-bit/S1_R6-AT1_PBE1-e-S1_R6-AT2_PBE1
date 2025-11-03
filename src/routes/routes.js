const express = require('express');
const router = express.Router();

// Referência do arquivo de rotas

const { produtoRoutes } = require('./produtoRoutes');
router.use('/', produtoRoutes);

const {clienteRoutes} = require('./clienteRoutes');
router.use('/', clienteRoutes);

module.exports = { router }