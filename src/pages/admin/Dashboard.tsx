import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, ShoppingCart, Users, DollarSign, 
  BarChart2, TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { products } from '../../data/products';
import { getOrderStatistics, orders } from '../../data/ordersData';
import { getEmployeeStatistics } from '../../data/employeesData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const orderStats = getOrderStatistics();
  const employeeStats = getEmployeeStatistics();
  
  // Mock data for sales overview chart
  const salesChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [450000, 380000, 520000, 480000, 600000, 580000],
        borderColor: '#0072ff',
        backgroundColor: 'rgba(0, 114, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  // Mock data for product distribution
  const productChartData = {
    labels: ['Industrial Machinery', 'Precision Components', 'Automation Systems', 'Custom Equipment'],
    datasets: [
      {
        label: 'Products',
        data: [35, 25, 30, 10],
        backgroundColor: [
          'rgba(0, 114, 255, 0.8)',
          'rgba(138, 154, 174, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };
  
  // Mock data for monthly orders
  const orderChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 15, 17, 14, 18],
        backgroundColor: 'rgba(0, 114, 255, 0.8)',
      },
    ],
  };
  
  // Recent orders for dashboard
  const recentOrders = orders.slice(0, 5);
  
  // Recent notifications
  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'New order #ORD-2025-008 received',
      time: '2 hours ago',
      priority: 'normal',
    },
    {
      id: 2,
      type: 'product',
      message: 'Low stock alert: Precision Bearing Assembly',
      time: '5 hours ago',
      priority: 'high',
    },
    {
      id: 3,
      type: 'employee',
      message: 'Mihir Patel is on leave today',
      time: '6 hours ago',
      priority: 'normal',
    },
    {
      id: 4,
      type: 'order',
      message: 'Order #ORD-2025-005 has been cancelled',
      time: '1 day ago',
      priority: 'high',
    },
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back to the admin dashboard.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: 'Total Products',
            value: products.length,
            icon: <Package className="w-6 h-6 text-primary-500" />,
            link: '/admin/products',
            color: 'bg-blue-50 text-primary-500',
          },
          {
            title: 'Total Orders',
            value: orderStats.totalOrders,
            icon: <ShoppingCart className="w-6 h-6 text-secondary-500" />,
            link: '/admin/orders',
            color: 'bg-gray-50 text-secondary-500',
          },
          {
            title: 'Revenue',
            value: `₹${orderStats.totalRevenue.toLocaleString()}`,
            icon: <DollarSign className="w-6 h-6 text-accent-500" />,
            link: '/admin/orders',
            color: 'bg-amber-50 text-accent-500',
          },
          {
            title: 'Employees',
            value: employeeStats.totalEmployees,
            icon: <Users className="w-6 h-6 text-green-600" />,
            link: '/admin/employees',
            color: 'bg-green-50 text-green-600',
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
            <Link
              to={stat.link}
              className="mt-4 text-primary-500 text-sm font-medium hover:text-primary-600 flex items-center"
            >
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <div className="bg-primary-50 text-primary-500 p-2 rounded-md">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="h-72">
            <Line 
              data={salesChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `₹${(value as number).toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Product Categories</h2>
            <div className="bg-secondary-50 text-secondary-500 p-2 rounded-md">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
          <div className="h-72 flex items-center justify-center">
            <div className="w-3/4 h-full">
              <Doughnut 
                data={productChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Monthly Orders</h2>
          </div>
          <div className="h-60">
            <Bar 
              data={orderChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary-500 text-sm font-medium hover:text-primary-600">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {order.customer.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'pending'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      
      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
          <button className="text-primary-500 text-sm font-medium hover:text-primary-600">
            Mark All as Read
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                notification.priority === 'high'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {notification.type === 'order' ? (
                  <ShoppingCart className="w-5 h-5" />
                ) : notification.type === 'product' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;