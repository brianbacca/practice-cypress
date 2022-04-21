const express = require('express');
const routes = express.Router();
const {
  saveProductController,
  getProductsController,
  getProductIdController,
  updateProductIdController,
  deleteProductIdController,
} = require('../controllers/product-controllers');

routes.post('/products', saveProductController);

routes.get('/products', getProductsController);

routes.get('/products/:id', getProductIdController);

routes.put('/products/:id', updateProductIdController);

routes.delete('/products/:id', deleteProductIdController);

module.exports.routes = routes;
