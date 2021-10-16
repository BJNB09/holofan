//Conexión con MySql

const mysql = require('mysql');

const {promisify} = require('util');
const {database} = require('./keys');
 
const pool = mysql.createPool(database);

//Para usar el modulo y no estar llamndo siempre
pool.getConnection((err, connection) => {
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECCONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is connected succesfully');
    return;
}); 

//Promisify pool querys

pool.query = promisify(pool.query);

module.exports = pool;