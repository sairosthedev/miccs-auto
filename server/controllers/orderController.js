const Order = require('../models/Order');
const Car = require('../models/Car');

exports.placeOrder = async (req, res) => {
  try {
    const { carId, quantity, paymentMethod, shippingAddress } = req.body;
    const car = await Car.findById(carId);
    if (!car || !car.inStock || car.sold) {
      return res.status(400).json({ error: 'Car not available' });
    }
    const totalPrice = (car.price - (car.discount || 0)) * (quantity || 1);
    const order = new Order({
      userId: req.user.id,
      carId,
      quantity: quantity || 1,
      totalPrice,
      paymentMethod,
      shippingAddress,
      status: 'Pending',
    });
    await order.save();
    car.inStock = false;
    car.sold = true;
    await car.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId carId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const orders = await Order.find({ userId: req.params.id }).populate('carId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 