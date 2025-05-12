import { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash, 
  SlidersHorizontal, Eye, X, CheckCircle, AlertTriangle,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productCategories } from '../../data/products';
import axios from 'axios';

// Product Type
type Product = {
  _id: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  inStock: boolean;
  stock: number;
  specifications?: {
    features: string;
  };
  isActive?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Add Product Form Type
type ProductFormData = Omit<Product, '_id' | 'id'>;

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState<boolean | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // Update the productCategories array with proper categories
  const productCategories = [
    "Electric Motor",
    "Electric Generator",
    "Electric Control Panel",
    "Door Closer",
    "Electrical Switch Board",
    "Metal Door",
    "Metal Fittings"
  ];

  // New Product Form State
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: '',
    category: 'machinery',
    description: '',
    price: 0,
    features: [''],
    image: '',
    inStock: true,
    stock: 1
  });

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          // Transform the products to include inStock property
          const productsWithStock = response.data.products.map((product: Product) => ({
            ...product,
            inStock: product.stock > 0
          }));
          setProducts(productsWithStock);
        } else {
          throw new Error(response.data.error || 'Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handler functions
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!newProduct.name.trim()) throw new Error('Product name is required');
      if (!newProduct.description.trim()) throw new Error('Description is required');
      if (!newProduct.image.trim()) throw new Error('Image URL is required');
      if (newProduct.price <= 0) throw new Error('Price must be greater than 0');

      // Get the token
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      // Prepare data for API
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        stock: newProduct.inStock ? 1 : 0,
        image: newProduct.image,
        specifications: {
          features: newProduct.features.filter(f => f.trim() !== '').join(', ')
        },
        isActive: true
      };

      console.log('Sending product data:', productData); // Debug log

      // Make API call
      const response = await axios.post('http://localhost:5000/api/products', productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Add the new product to the local state with inStock property
        const newProductWithStock = {
          ...response.data.product,
          inStock: response.data.product.stock > 0
        };
        setProducts(prev => [...prev, newProductWithStock]);
        setIsAddModalOpen(false);
        
        // Reset form
        setNewProduct({
          name: '',
          category: 'machinery',
          description: '',
          price: 0,
          features: [''],
          image: '',
          inStock: true,
          stock: 1
        });

        showNotification('Product added successfully!', 'success');
      } else {
        throw new Error(response.data.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Product creation error:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to add product', 'error');
    }
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => (p._id === product._id ? product : p)));
    setIsEditModalOpen(false);
    showNotification('Product updated successfully!', 'success');
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('Authentication required', 'error');
        return;
      }

      // Make API call to delete the product
      const response = await axios.delete(`http://localhost:5000/api/products/${selectedProduct._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Remove only the selected product from the UI
        setProducts(prev => prev.filter(p => p._id !== selectedProduct._id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        showNotification('Product deleted successfully!', 'success');
      } else {
        throw new Error(response.data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification(
        error instanceof Error 
          ? error.message 
          : 'Failed to delete product. Please try again.',
        'error'
      );
    }
  };

  // Update the delete button click handler
  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Add/Remove feature fields
  const addFeatureField = () => {
    setNewProduct(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeatureField = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewProduct(prev => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return {
        ...prev,
        features: updatedFeatures
      };
    });
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    const matchesStock = 
      stockFilter === null ? true :
      stockFilter === true ? product.inStock : 
      !product.inStock;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setStockFilter(null);
    setIsFilterOpen(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Products Management</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* <div>
              <h1 className="text-2xl font-semibold mb-2">Products Management</h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div> */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary flex items-center sm:self-start"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="btn btn-outline py-2 flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {(selectedCategory || stockFilter !== null) && (
                    <span className="ml-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {(selectedCategory ? 1 : 0) + (stockFilter !== null ? 1 : 0)}
                    </span>
                  )}
                </button>
                {(selectedCategory || stockFilter !== null) && (
                  <button
                    onClick={resetFilters}
                    className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={selectedCategory || ''}
                          onChange={(e) => setSelectedCategory(e.target.value || null)}
                          className="form-input"
                        >
                          <option value="">All Categories</option>
                          {productCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Status
                        </label>
                        <select
                          value={stockFilter === null ? '' : stockFilter ? 'inStock' : 'outOfStock'}
                          onChange={(e) => {
                            if (e.target.value === '') setStockFilter(null);
                            else setStockFilter(e.target.value === 'inStock');
                          }}
                          className="form-input"
                        >
                          <option value="">All</option>
                          <option value="inStock">In Stock</option>
                          <option value="outOfStock">Out of Stock</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsEditModalOpen(true);
                              }}
                              className="text-blue-500 hover:text-blue-700 p-1"
                              title="Edit Product"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(product)}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button onClick={resetFilters} className="btn btn-primary">
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddProduct}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Product</h3>
                    <p className="mt-1 text-sm text-gray-600">Fill in the product details below.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="mt-1 form-input"
                        required
                      >
                        {productCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        rows={3}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        min="0"
                        step="0.01"
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                      </label>
                      {newProduct.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className="form-input flex-1"
                            placeholder="Enter feature"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeFeatureField(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeatureField}
                        className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Feature
                      </button>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={newProduct.inStock}
                        onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                        In Stock
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="mt-3 sm:mt-0 w-full sm:w-auto btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteProduct}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 max-w-md py-2 px-4 rounded-lg shadow-lg flex items-center ${
              notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            )}
            <p>{notification.message}</p>
            <button
              onClick={() => setNotification({ ...notification, show: false })}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsManagement;