const mysql = require('mysql2/promise');
const test = require('node:test');

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'LojaDB',
    port: 3308,
    waitForConnections: true,   //aguarda conexões livres
    connectionLimit: 10,        //limita o número de conexões simultâneas
    queueLimit: 0               //sem limites para a fila de conexões
});

(async ()=>{
    try {
        const conection = await pool.getConnection();
        console.log(`Conectado ao MySQL`);
        conection.release();
    } catch (error) {
        console.error(`Erro ao conectar ao MySQL: ${error}`);
    }
})();


module.exports = pool;