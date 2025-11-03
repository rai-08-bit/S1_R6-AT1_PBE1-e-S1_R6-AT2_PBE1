const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteController');

clienteRoutes.post('/clientes', clienteController.incluirCliente);
clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);

module.exports = {clienteRoutes}

