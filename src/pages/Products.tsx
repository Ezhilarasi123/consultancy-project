import { ChevronRight, Filter, Search, X, Plus, Minus, Truck, Shield, RotateCcw, Star, ShoppingCart, CheckCircle, CreditCard, Smartphone, Ban as Bank, DollarSign, Lock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, productCategories } from '../data/products';
import type { Product } from '../data/products';
import { createOrder } from '../services/api';

// Order form type
type OrderFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  quantity?: string;
  paymentMethod?: string;
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Order form state
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
    paymentMethod: 'upi'
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 100) {
      setQuantity(value);
      setOrderForm(prev => ({ ...prev, quantity: value }));
    }
  };

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    // Check if name contains numbers or special characters
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(name)) return 'Name should only contain letters and spaces';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Email is required';
    // More comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address (e.g., example@domain.com)';
    // Additional validation for common email issues
    if (email.includes('..')) return 'Email cannot contain consecutive dots';
    if (email.startsWith('.') || email.endsWith('.')) return 'Email cannot start or end with a dot';
    if (email.includes(' ')) return 'Email cannot contain spaces';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit phone number';
    return undefined;
  };

  const validateAddress = (address: string): string | undefined => {
    if (!address.trim()) return 'Address is required';
    if (address.length < 10) return 'Please enter a complete address';
    return undefined;
  };

  const validateQuantity = (quantity: number): string | undefined => {
    if (quantity < 1) return 'Quantity must be at least 1';
    if (quantity > 100) return 'Maximum quantity is 100';
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      name: validateName(orderForm.name),
      email: validateEmail(orderForm.email),
      phone: validatePhone(orderForm.phone),
      address: validateAddress(orderForm.address),
      quantity: validateQuantity(orderForm.quantity),
    };

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== undefined);
  };

  // Handle order submission
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      if (!selectedProduct) {
        throw new Error('No product selected');
      }
  
      const orderData = {
        customer: {
          name: orderForm.name,
          email: orderForm.email,
          phone: orderForm.phone,
          address: orderForm.address
        },
        product: {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price
        },
        quantity: quantity,
        totalAmount: selectedProduct.price * quantity,
        paymentMethod: orderForm.paymentMethod
      };
  
      const response = await createOrder(orderData);
      
      if (response.success) {
        setOrderSuccess(true);
        // Don't reset the form immediately to show success message
        // resetOrder();
      } else {
        throw new Error(response.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset order form
  const resetOrder = () => {
    setShowOrderForm(false);
    setOrderSuccess(false);
    setQuantity(1);
    setOrderForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      quantity: 1,
      paymentMethod: 'upi'
    });
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method: OrderFormData['paymentMethod']) => {
    switch (method) {
      case 'upi':
        return <Smartphone className="w-5 h-5" />;
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'netbanking':
        return <Bank className="w-5 h-5" />;
      case 'cod':
        return <DollarSign className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Handle input changes with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'quantity') {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        handleQuantityChange(numValue);
      }
    } else {
      setOrderForm(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="mb-4">Our Products</h1>
            <p className="text-xl text-white/90 mb-6">
              Discover our range of precision-engineered industrial products designed to meet your specific requirements.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition ${
                      selectedCategory === null ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>
                  {productCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition ${
                        selectedCategory === category ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Controls */}
              <div className="lg:hidden mb-6 flex items-center justify-between">
                <div className="text-lg font-semibold">
                  {selectedCategory ? selectedCategory : 'All Products'}
                  {selectedCategory && (
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="ml-2 text-sm text-primary-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn btn-outline py-1.5 px-3"
                >
                  <Filter size={18} className="mr-2" />
                  Filter
                </button>
                
                {/* Mobile Filter Panel */}
                {showFilters && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="bg-white w-3/4 h-full overflow-auto"
                    >
                      <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <button 
                          onClick={() => setShowFilters(false)}
                          className="p-1"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setSelectedCategory(null);
                              setShowFilters(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md transition ${
                              selectedCategory === null ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-gray-100'
                            }`}
                          >
                            All Products
                          </button>
                          {productCategories.map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category);
                                setShowFilters(false);
                              }}
                              className={`block w-full text-left px-3 py-2 rounded-md transition ${
                                selectedCategory === category ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-gray-100'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
              
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="card h-full flex flex-col overflow-hidden"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {!product.inStock && (
                          <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs font-bold px-3 py-1">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="mb-2">
                          <span className="text-sm text-primary-600 font-medium">{product.category}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                            {product.inStock ? (
                              <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-1 rounded">In Stock</span>
                            ) : (
                              <span className="text-xs bg-gray-100 text-gray-800 font-medium px-2 py-1 rounded">Out of Stock</span>
                            )}
                          </div>
                          
                          <button 
                            className="btn btn-primary w-full"
                            onClick={() => setSelectedProduct(product)}
                          >
                            View Details <ChevronRight className="ml-1 w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="btn btn-primary"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Product Details</h2>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setShowOrderForm(false);
                    setOrderSuccess(false);
                    setError(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {orderSuccess ? (
                <div className="p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your order. Your order has been successfully placed and will be processed shortly.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Order Details:</h4>
                      <p className="text-gray-600">Product: {selectedProduct.name}</p>
                      <p className="text-gray-600">Quantity: {quantity}</p>
                      <p className="text-gray-600">Total Amount: ₹{(selectedProduct.price * quantity).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        resetOrder();
                        setSelectedProduct(null);
                      }}
                      className="btn btn-primary w-full"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : showOrderForm ? (
                <form onSubmit={handleOrderSubmit} className="p-6 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-4">
                      <AlertTriangle className="w-5 h-5 inline-block mr-2" />
                      {error}
                    </div>
                  )}

                  {/* Form Inputs */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={orderForm.name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={orderForm.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.address ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="btn btn-outline px-3 py-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleInputChange}
                        min="1"
                        max="100"
                        className={`flex-1 block w-full rounded-md border ${
                          formErrors.quantity ? 'border-red-500' : 'border-gray-300'
                        } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 100}
                        className="btn btn-outline px-3 py-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {formErrors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.quantity}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={orderForm.paymentMethod}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="upi">UPI</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Price per unit:</span>
                      <span>₹{selectedProduct.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Quantity:</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>₹{(selectedProduct.price * quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </form>
              ) : (
                // 📦 Default Product Detail View
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full md:w-1/2 object-cover rounded-lg"
                    />

                    <div className="flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                        <p className="text-gray-600 mb-4">{selectedProduct.category}</p>
                        <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                        <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
                        <ul className="list-disc ml-6 space-y-2 text-gray-600">
                          {selectedProduct.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Buy Now Button */}
                      {selectedProduct.inStock && (
                        <button
                          onClick={() => setShowOrderForm(true)}
                          className="btn btn-primary mt-6 w-full"
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Products;