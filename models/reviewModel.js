const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },

}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);
