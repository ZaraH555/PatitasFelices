require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// ✅ Middleware necesario
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ✅ Conexión a base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patitas_felices',
  charset: 'utf8mb4'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

// ✅ Ruta de registro
app.post('/api/auth/register', (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    direccion,
    telefono,
    contraseña,
    rol,
    zona_servicio,
    disponibilidad,
    tarifa
  } = req.body;

  if (!nombre || !correo || !contraseña || !rol) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const sql = `INSERT INTO usuarios 
    (nombre, apellido, correo, direccion, telefono, contraseña, rol) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [nombre, apellido, correo, direccion, telefono, contraseña, rol];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error al registrar usuario:', err);
      return res.status(500).json({ message: 'Error al registrar usuario' });
    }

    const userId = result.insertId;

    // Si el usuario es paseador, insertar en la tabla paseadores
    if (rol === 'paseador') {
      const paseadorSQL = `INSERT INTO paseadores (usuario_id, zona_servicio, disponibilidad, tarifa)
                           VALUES (?, ?, ?, ?)`;
      db.query(paseadorSQL, [userId, zona_servicio, disponibilidad, tarifa], (err2) => {
        if (err2) {
          console.error('❌ Error al registrar paseador:', err2);
          return res.status(500).json({ message: 'Error al registrar paseador' });
        }
        res.status(201).json({ message: 'Paseador registrado correctamente' });
      });
    } else {
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    }
  });
});

// ✅ Ruta de login
app.post('/api/auth/login', (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
  db.query(sql, [correo, contraseña], (err, results) => {
    if (err) {
      console.error('❌ Error al buscar usuario:', err);
      return res.status(500).json({ message: 'Error al buscar usuario' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const usuario = results[0];
    res.json({
      message: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  });
});

// ✅ Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
