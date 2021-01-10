// this will do behinde sequlize
// // get the client
// const mysql = require('mysql2');

// // Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password : "diwanga"
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0
// })
// module.exports = pool.promise();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'diwanga', {
  host: 'localhost',
  dialect:'mysql'
});

module.exports = sequelize;  // this is pool. promises is inbuild.



