const Product = require('../models/product-model');

module.exports.saveProduct = ({ name, size, description }) => {
  const product = new Product({
    name,
    size,
    description,
  });
  return product.save();
};

module.exports.getProducts = () => Product.find().exec();

module.exports.getProductId = (id) => Product.findById(id).exec();

module.exports.updateProductID = ({ id }, data) =>
  Product.findByIdAndUpdate({ _id: id }, data, { new: true });

module.exports.deleteProductID = ({ id }) =>
  Product.findOneAndDelete({ _id: id }).exec();
