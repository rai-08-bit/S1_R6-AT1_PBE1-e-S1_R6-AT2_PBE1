const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteController');

clienteRoutes.post('/clientes', clienteController.incluirCliente);
clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.get('/clientes/:idCliente', clienteController.buscarClientePorId);
clienteRoutes.put('/clientes/:idCliente', clienteController.atualizarCliente);
clienteRoutes.delete('/clientes/:idCliente', clienteController.excluirCliente);


module.exports = {clienteRoutes}

