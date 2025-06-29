require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();

// Global Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "http://localhost:5000"],
    },
  })
);
app.use(morgan('dev'));

// Add CORS headers for static files in /uploads
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars'); // includes social sharing endpoint
const orderRoutes = require('./routes/orders');
const discountRoutes = require('./routes/discount');
const agentRoutes = require('./routes/agents');

app.use('/api/auth', authRoutes); // Auth (register, login, logout)
app.use('/api/cars', carRoutes); // Cars CRUD, share link
app.use('/api/orders', orderRoutes); // Orders CRUD
app.use('/api/discount', discountRoutes); // Discounts
app.use('/api/agents', agentRoutes); // Agent/admin features

// Health check
app.get('/', (req, res) => {
  res.send('Miccs Auto Backend API');
});

// Error Handler (should be last)
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 