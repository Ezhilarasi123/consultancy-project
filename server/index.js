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

const allowedOrigins = ['http://localhost:5173', 'https://consultancy-project-xi.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors()); // handle preflight

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
    if (!req.user) {
      console.error('No user found in req.user!');
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    console.log('User from auth middleware (POST /api/orders):', req.user);
    console.log('Received order request:', req.body);

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
    if (!req.user) {
      console.error('No user found in req.user!');
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    console.log('User from auth middleware (GET /api/orders/my-orders):', req.user);

    // Find orders either by createdBy or by matching customer email
    const orders = await Order.find({
      $or: [
        { createdBy: req.user._id },
        { 'customer.email': req.user.email }
      ]
    }).sort({ createdAt: -1 });

    // Update orders that don't have createdBy field
    for (const order of orders) {
      if (!order.createdBy) {
        order.createdBy = req.user._id;
        await order.save();
        console.log(`Updated order ${order.orderNumber} with createdBy field`);
      }
    }

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

// Fix missing createdBy field in orders (one-time fix)
app.post('/api/orders/fix-missing-createdby', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    // Find all orders for this user's email that don't have createdBy
    const orders = await Order.find({
      'customer.email': req.user.email,
      createdBy: { $exists: false }
    });

    console.log(`Found ${orders.length} orders to update`);

    // Update each order
    for (const order of orders) {
      order.createdBy = req.user._id;
      await order.save();
      console.log(`Updated order ${order.orderNumber} with createdBy: ${req.user._id}`);
    }

    res.json({
      success: true,
      message: `Updated ${orders.length} orders`,
      orders
    });
  } catch (error) {
    console.error('Error fixing orders:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fix orders'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));