const express = require('express');
const agentController = require('../controllers/agentController');
const { auth, role } = require('../middleware/auth');

const router = express.Router();

// Admin: Get all agents
router.get('/', auth, role('admin'), agentController.getAllAgents);
// Admin: Assign agent to order
router.post('/assign', auth, role('admin'), agentController.assignAgentToOrder);
// Admin: Get agent performance
router.get('/performance/:agentId', auth, role('admin'), agentController.getAgentPerformance);

// Agent: Get assigned orders
router.get('/orders', auth, role('agent'), agentController.getAssignedOrders);
// Agent: Get own performance
router.get('/performance', auth, role('agent'), agentController.getOwnPerformance);

module.exports = router; 