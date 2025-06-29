const User = require('../models/User');
const Order = require('../models/Order');

// Admin: Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Assign agent to order
exports.assignAgentToOrder = async (req, res) => {
  try {
    const { orderId, agentId } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { assignedAgent: agentId }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Get agent performance (number of sales/orders)
exports.getAgentPerformance = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const orders = await Order.find({ assignedAgent: agentId });
    const completed = orders.filter(o => o.status === 'Completed').length;
    res.json({ totalAssigned: orders.length, completed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agent: Get assigned orders
exports.getAssignedOrders = async (req, res) => {
  try {
    const agentId = req.user.id;
    const orders = await Order.find({ assignedAgent: agentId }).populate('userId carId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agent: Get own performance
exports.getOwnPerformance = async (req, res) => {
  try {
    const agentId = req.user.id;
    const orders = await Order.find({ assignedAgent: agentId });
    const completed = orders.filter(o => o.status === 'Completed').length;
    res.json({ totalAssigned: orders.length, completed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 