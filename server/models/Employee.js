import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['engineer', 'manager', 'technician', 'sales', 'support', 'other']
  },
  department: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'on-leave', 'inactive'],
    default: 'active'
  },
  avatar: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Add text index for search functionality
employeeSchema.index({ name: 'text', email: 'text' });

export default mongoose.model('Employee', employeeSchema); 