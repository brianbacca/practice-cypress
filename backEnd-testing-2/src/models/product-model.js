const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const productSchema = new Schema({
  name: String,
  size: Number,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
