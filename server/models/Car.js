const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  description: { type: String },
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  sold: { type: Boolean, default: false },
  soldBy: { type: String },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema); 