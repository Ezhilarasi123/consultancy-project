import { useState, useEffect } from 'react';
import { 
  Search, Filter, Edit, Eye, X, Plus, 
  CheckCircle, AlertTriangle, SlidersHorizontal, UserPlus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar?: string;
}

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar: string;
}

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'on-leave' | 'inactive' | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // New Employee Form State
  const [newEmployee, setNewEmployee] = useState<EmployeeFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'engineer',
    department: 'Engineering',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
    avatar: ''
  });

  const departments = ['Engineering', 'Sales', 'Support', 'Management', 'HR', 'IT'];
  const roles = ['engineer', 'manager', 'technician', 'sales', 'support', 'other'];

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      showNotification('Failed to fetch employees', 'error');
      setLoading(false);
    }
  };

  // Handle form submission
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!newEmployee.name.trim()) throw new Error('Name is required');
      if (!newEmployee.email.trim()) throw new Error('Email is required');
      if (!newEmployee.phone.trim()) throw new Error('Phone is required');

      // Format the data to match server requirements
      const employeeData = {
        ...newEmployee,
        joinDate: new Date(newEmployee.joinDate).toISOString(),
        role: newEmployee.role.toLowerCase(),
        department: newEmployee.department
      };

      console.log('Sending employee data:', employeeData);

      const response = await axios.post('http://localhost:5000/api/employees', employeeData);
      
      setEmployees([response.data, ...employees]);
      setIsAddModalOpen(false);
      showNotification('Employee added successfully!', 'success');
      
      // Reset form
      setNewEmployee({
        name: '',
        email: '',
        phone: '',
        role: 'engineer',
        department: 'Engineering',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active',
        avatar: ''
      });
    } catch (error: any) {
      console.error('Error adding employee:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        showNotification(error.response.data.message || 'Failed to add employee', 'error');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        showNotification('No response from server', 'error');
      } else {
        // Something happened in setting up the request that triggered an Error
        showNotification(error.message || 'Failed to add employee', 'error');
      }
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole ? employee.role === selectedRole : true;
    const matchesDepartment = selectedDepartment ? employee.department === selectedDepartment : true;
    const matchesStatus = selectedStatus ? employee.status === selectedStatus : true;
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRole(null);
    setSelectedDepartment(null);
    setSelectedStatus(null);
    setIsFilterOpen(false);
  };

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: 'active' | 'on-leave' | 'inactive') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Employee Management</h1>
          <p className="text-gray-600">View and manage employee information</p>
        </div>
        <button
          className="btn btn-primary flex items-center sm:self-start"
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 form-input w-full"
              />
            </div>
          </div>
          <button
            className="btn btn-outline flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
            {isFilterOpen ? (
              <X className="w-5 h-5 ml-2" />
            ) : (
              <SlidersHorizontal className="w-5 h-5 ml-2" />
            )}
          </button>
        </div>

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={selectedRole || ''}
                      onChange={(e) => setSelectedRole(e.target.value || null)}
                      className="form-input"
                    >
                      <option value="">All Roles</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      value={selectedDepartment || ''}
                      onChange={(e) => setSelectedDepartment(e.target.value || null)}
                      className="form-input"
                    >
                      <option value="">All Departments</option>
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={selectedStatus || ''}
                      onChange={(e) => setSelectedStatus(e.target.value as 'active' | 'on-leave' | 'inactive' || null)}
                      className="form-input"
                    >
                      <option value="">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
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
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {employee.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={employee.avatar}
                              alt={employee.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-sm">
                                {employee.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(employee.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(employee.status)}`}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No employees found</h3>
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

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddEmployee}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Employee</h3>
                    <p className="mt-1 text-sm text-gray-600">Fill in the employee details below.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="role"
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        className="mt-1 form-input"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <select
                        id="department"
                        value={newEmployee.department}
                        onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                        className="mt-1 form-input"
                      >
                        {departments.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                        Join Date
                      </label>
                      <input
                        type="date"
                        id="joinDate"
                        value={newEmployee.joinDate}
                        onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                        className="mt-1 form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={newEmployee.status}
                        onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value as 'active' | 'on-leave' | 'inactive' })}
                        className="mt-1 form-input"
                      >
                        <option value="active">Active</option>
                        <option value="on-leave">On Leave</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Avatar URL (Optional)
                      </label>
                      <input
                        type="url"
                        id="avatar"
                        value={newEmployee.avatar}
                        onChange={(e) => setNewEmployee({ ...newEmployee, avatar: e.target.value })}
                        className="mt-1 form-input"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Add Employee
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline w-full sm:w-auto mt-3 sm:mt-0"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertTriangle className="w-5 h-5 mr-2" />
              )}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeManagement;