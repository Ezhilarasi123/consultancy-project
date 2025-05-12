import express from 'express';
import Product from '../models/Product.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Create new product (admin only)
router.post('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      specifications
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
      specifications,
      createdBy: req.user._id
    });

    await product.save();

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create product'
    });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const { search, category, sort = '-createdAt' } = req.query;
    
    let query = {};
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .sort(sort)
      .populate('createdBy', 'name email');
    
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch products'
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch product'
    });
  }
});

// Update product (admin only)
router.put('/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      specifications,
      isActive
    } = req.body;

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (image) product.image = image;
    if (specifications) product.specifications = specifications;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update product'
    });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete product'
    });
  }
});

export default router; 