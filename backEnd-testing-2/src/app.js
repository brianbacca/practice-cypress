const express = require('express');
const morgan = require('morgan');
const { routes } = require('./routes/product-routes');
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use(routes);
module.exports = app;
