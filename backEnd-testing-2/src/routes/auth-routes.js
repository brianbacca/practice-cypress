const express = require('express');
const { login, signin } = require('../controllers/auth-controllers');

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/signin', signin);

module.exports.authRoutes = authRoutes;
