const express = require('express');
const routes = express.Router();
const {
  saveProduct,
  getProducts,
  getProductId,
  updateProductID,
} = require('../data/product-data');

routes.post('/products', async (req, res) => {
  const { name, size, description } = req.body;
  console.log(req.body);
  const productStored = await saveProduct({ name, size, description });
  return res.status(201).send(productStored);
});

routes.get('/products', async (req, res) => {
  const products = await getProducts();
  return res.status(200).send(products);
});

routes.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await getProductId(id);
  return res.status(200).json(product);
});
routes.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, size, description } = req.body;
  const productUpdate = await updateProductID(
    { id },
    { name, size, description }
  );
  return res.status(201).json(productUpdate);
});

module.exports.routes = routes;
