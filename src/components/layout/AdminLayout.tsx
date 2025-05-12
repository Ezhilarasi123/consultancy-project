import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  LogOut, Menu, X, Bell, ChevronDown, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: 'Dashboard', 
      path: '/admin' 
    },
    { 
      icon: <Package className="w-5 h-5" />, 
      label: 'Products', 
      path: '/admin/products' 
    },
    { 
      icon: <ShoppingCart className="w-5 h-5" />, 
      label: 'Orders', 
      path: '/admin/orders' 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: 'Employees', 
      path: '/admin/employees' 
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="px-4 py-6 border-b flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-semibold">Madhura Admin</span>
            <button 
              className="ml-auto lg:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          
          {/* Sidebar navigation */}
          <nav className="flex-1 py-6 px-3 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => `
                  flex items-center px-3 py-3 mb-2 rounded-md transition-colors
                  ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <button 
              className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-[5]">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search */}
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-primary-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-medium">
                  {user?.name?.charAt(0)}
                </div>
                <span className="hidden md:block font-medium">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-10"
                >
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    Signed in as <span className="font-medium text-gray-900">{user?.email}</span>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[5] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;