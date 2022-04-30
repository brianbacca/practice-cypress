const express = require('express');
const routes = express.Router();
const {
  saveProductController,
  getProductsController,
  getProductIdController,
  updateProductIdController,
  deleteProductIdController,
} = require('../controllers/product-controllers');

const { isAuthHandler } = require('../middlewares/auth-middleware');
const {
  validateRequiredValues,
  validateId,
} = require('../middlewares/product-middlewares');

routes.post('/products', validateRequiredValues, saveProductController);

routes.get('/products', [isAuthHandler], getProductsController);

routes.get('/products/:id', validateId, getProductIdController);

routes.put('/products/:id', [
  validateId,
  validateRequiredValues,
  updateProductIdController,
]);

routes.delete('/products/:id', validateId, deleteProductIdController);

module.exports.routes = routes;
