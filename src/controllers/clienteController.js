const { clienteModel } = require('../models/clienteModel');
const clienteController = {
    incluirCliente: async (req, res) => {
        try {
            const { nome, cpf } = req.body;

            if (!String(nome) || nome.length < 3 || !Number(cpf) || cpf.length != 11) {
                return res.status(400).json({ message: 'Os dados digitados estão incompletos, digite novamente' })
            }

            const validarCpf = await clienteModel.confirmarCpf(cpf);
            if (validarCpf.length > 0) {
                return res.status(409).json({ message: 'CPF já cadastrado' });
            }

            const resultado = await clienteModel.adicionarCliente(nome, cpf);
            if (resultado.affectedRows === 1) {
                res.status(201).json({ message: 'Os dados foram incluídos com sucesso', result: resultado });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro, por favor, tente novamente')
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },

    buscarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodosClientes();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Lista dos dados de todos os clientes', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    }
}

module.exports = { clienteController }