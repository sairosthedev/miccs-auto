const Car = require('../models/Car');

exports.setDiscount = async (req, res) => {
  try {
    const { discount } = req.body;
    const car = await Car.findByIdAndUpdate(
      req.params.carId,
      { discount },
      { new: true }
    );
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const { discount } = req.body;
    const car = await Car.findByIdAndUpdate(
      req.params.carId,
      { discount },
      { new: true }
    );
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 