import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new employee
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { name, email, phone, role, department, joinDate, status, avatar } = req.body;
    
    console.log('Received employee data:', req.body);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format',
        details: { email: 'Please provide a valid email address' }
      });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        message: 'Invalid phone format',
        details: { phone: 'Please provide a valid 10-digit phone number' }
      });
    }

    // Validate role
    const validRoles = ['engineer', 'manager', 'technician', 'sales', 'support', 'other'];
    if (!validRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ 
        message: 'Invalid role',
        details: { role: `Role must be one of: ${validRoles.join(', ')}` }
      });
    }

    // Validate required fields
    if (!name || !email || !phone || !role || !department || !joinDate) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          phone: !phone ? 'Phone is required' : null,
          role: !role ? 'Role is required' : null,
          department: !department ? 'Department is required' : null,
          joinDate: !joinDate ? 'Join date is required' : null
        }
      });
    }

    const employee = new Employee({
      name,
      email,
      phone,
      role: role.toLowerCase(),
      department,
      joinDate: new Date(joinDate),
      status: status || 'active',
      avatar: avatar || ''
    });

    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    if (error.code === 11000) {
      res.status(400).json({ 
        message: 'Email already exists',
        details: { email: 'This email address is already registered' }
      });
    } else if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const validationErrors = {};
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });
      res.status(400).json({ 
        message: 'Validation error',
        details: validationErrors
      });
    } else {
      res.status(400).json({ 
        message: error.message,
        details: { general: 'An error occurred while creating the employee' }
      });
    }
  }
});

// Update employee
router.patch('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    Object.keys(req.body).forEach(key => {
      employee[key] = req.body[key];
    });

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 