const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patitas_felices', 
  charset: 'utf8mb4'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    throw err;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;
