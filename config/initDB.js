const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

/**
 * Database Create and connection
 */

initDB();
async function initDB() {
    const connection = await mysql.createConnection({ 
        host:process.env.HOST,
        port:3306, 
        user:process.env.DB_USER, 
        password:process.env.DB_PASSWORD 
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
}

var sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: process.env.HOST,
   port: 3306,
   dialect: 'mysql'
});


module.exports = sequelize;