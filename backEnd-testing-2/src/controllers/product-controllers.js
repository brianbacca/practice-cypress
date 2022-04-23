const {
  saveProduct,
  getProducts,
  getProductId,
  updateProductID,
  deleteProductID,
} = require('../data/product-data');

module.exports.saveProductController = async (req, res) => {
  const { name, size, description } = req.body;

  const productStored = await saveProduct({ name, size, description });
  return res.status(201).send(productStored);
};

module.exports.getProductsController = async (req, res, next) => {
  try {
    const products = await getProducts();
    return res.status(200).send(products);
  } catch (e) {
    next(e);
  }
};

module.exports.getProductIdController = async (req, res) => {
  const { id } = req.params;

  const product = await getProductId(id);
  return res.status(200).json(product);
};

module.exports.updateProductIdController = async (req, res) => {
  const { id } = req.params;
  const { name, size, description } = req.body;
  const productUpdate = await updateProductID(
    { id },
    { name, size, description }
  );
  return res.status(201).json(productUpdate);
};

module.exports.deleteProductIdController = async (req, res) => {
  const { id } = req.params;
  const productRemove = await deleteProductID({ id });
  return res.status(200).json(productRemove);
};
