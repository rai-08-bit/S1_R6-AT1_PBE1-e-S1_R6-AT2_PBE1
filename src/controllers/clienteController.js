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
    },

    buscarClientePorId: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um identificador (id) válido' });
            }
            const resultado = await clienteModel.selecionarPorId(id);
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });

        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            let idCliente = Number(req.params.idCliente);
            const { nome, cpf } = req.body;

            if (!idCliente || !nome || !cpf || typeof idCliente !== 'number' || !isNaN(nome) || isNaN(cpf) || nome.trim().length < 3) {
                return res.status(400).json({ message: 'Verifique os dados e tente novamente' });
            }

            const clienteAtual = await clienteModel.selecionarPorId(idCliente);
            if (!clienteAtual || clienteAtual.length === 0) {
                throw new Error ("Cliente não localizado")
            }

            const novoNome = nome.trim() ?? clienteAtual[0].nome;
            const novoCpf = cpf ?? clienteAtual[0].cpf;

            const resultado = await clienteModel.editarCliente( novoNome, novoCpf, idCliente);

            if (resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar os dados do cliente')
            }

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });

        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    excluirCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            if (!idCliente || !Number.isInteger(idCliente)) {
                return res.status(400).json({ message: 'Forneça um ID válido' });
            }

            const clienteSelecionado = await clienteModel.selecionarPorId(idCliente);
            if (clienteSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            } else {
                const resultado = await clienteModel.deleteCliente(idCliente);
                if (resultado.affectedRows == 1) {
                    res.status(200).json({ message: 'Registro do cliente excluído com sucesso', data: resultado });
                } else {
                    throw new Error('Não foi possível excluir o produto');

                }
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
}

module.exports = { clienteController }