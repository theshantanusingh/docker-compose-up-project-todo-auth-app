const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const router = express.Router();

// Middleware to verify JWT
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).send({ error: 'All fields required' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1d' });
    res.status(201).send({ user: { id: result.insertId, name, email }, token });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).send({ error: 'Email already exists' });
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1d' });
    res.status(200).send({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Logout (Just clear client-side token or use blacklisting in production)
router.get('/logout', (req, res) => {
  res.send({ message: 'Logged out successfully' });
});

// Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [req.userId]);
    res.send(rows[0]);
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
