import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
import express from 'express';
import mongoose from 'mongoose';
import Order from './models/Order.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import employeeRoutes from './routes/employeeRoutes.js';
import { auth, checkRole } from './middleware/auth.js';
import cors from 'cors';

const app = express();
app.use(express.json());

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not set in the environment variables. Please set it in your .env file.');
}
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enable CORS with specific options
app.use(cors({
  origin: ['http://localhost:5173','https://consultancy-project-xi.vercel.app'], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Auth routes
app.use('/api/auth', authRoutes);

// Product routes
app.use('/api/products', productRoutes);

// Employee routes
app.use('/api/employees', employeeRoutes);

// Protected routes
app.use('/api/orders', auth);

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Received order request:', req.body);
    console.log('User from auth middleware:', req.user);

    const {
      customer,
      product,
      quantity,
      totalAmount,
      paymentMethod
    } = req.body;

    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8);

    const order = new Order({
      orderNumber,
      customer,
      product,
      quantity,
      totalAmount,
      paymentMethod,
      createdBy: req.user._id
    });

    await order.save();
    console.log('Order saved successfully:', order);

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create order'
    });
  }
});

// Get all orders (admin only)
app.get('/api/orders', checkRole(['admin']), async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch orders'
    });
  }
});

// Get user's orders
app.get('/api/orders/my-orders', async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch orders'
    });
  }
});

// Update order status
app.put('/api/orders/:orderId/status', checkRole(['admin']), async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update order status'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));