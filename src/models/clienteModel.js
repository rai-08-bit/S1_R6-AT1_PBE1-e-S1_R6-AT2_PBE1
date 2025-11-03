const pool = require ('../config/db');

const clienteModel = {

    adicionarCliente: async (pNome, pCpf) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [pNome, pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    }, 

    selecionarTodosClientes: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    confirmarCpf: async (clienteCpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf_cliente=?;';
        const values = [clienteCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = {clienteModel}