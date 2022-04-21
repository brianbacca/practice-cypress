const express = require('express');
const pino = require('pino-http')();
const routes = require('./routes');
const app = express();
app.use(pino);
app.use(express.json());

app.use(routes);
module.exports = app;
