const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // 
const router = express.Router();

const SECRET_KEY = 'clave-secreta-segura';

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, apellido, correo, direccion, telefono, contraseña, rol, zona_servicio, disponibilidad, tarifa } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await db.promise().query(
      `INSERT INTO usuarios (nombre, apellido, correo, direccion, telefono, contraseña, rol)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, correo, direccion, telefono, hashedPassword, rol]
    );

    const usuarioId = result.insertId;

    if (rol === 'paseador') {
      await db.promise().query(
        `INSERT INTO paseadores (usuario_id, zona_servicio, disponibilidad, tarifa)
         VALUES (?, ?, ?, ?)`,
        [usuarioId, zona_servicio, disponibilidad, tarifa]
      );
    }

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token, usuario });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
