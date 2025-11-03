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
    },

    selecionarPorId: async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    editarCliente: async ( pNome, pCpf, pId) => {
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?;';
        const values = [pNome, pCpf, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deleteCliente: async (pId) => {
        const sql = "DELETE FROM clientes WHERE id_cliente=?;";
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows
    }
}

module.exports = {clienteModel}