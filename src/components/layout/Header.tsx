import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import LoginModal from '../auth/LoginModal';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-heading font-semibold text-gray-900">Sri Madhura Engineering</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className={({ isActive }) =>
                    isActive ? 'nav-link-active' : 'nav-link'
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 nav-link"
                  >
                    <span>{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4 inline mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="nav-link flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  Login / Signup
                </button>
              )}
            </nav>
            
            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-primary-500 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container-custom py-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.path} 
                      to={link.path} 
                      className={({ isActive }) =>
                        isActive ? 'nav-link-active' : 'nav-link'
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  
                  {isAuthenticated ? (
                    <>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="nav-link flex items-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4 mr-1" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="nav-link flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-1" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="nav-link flex items-center"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Login / Signup
                    </button>
                  )}
                  
                  <Link 
                    to="/contact" 
                    className="btn btn-primary mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get a Quote
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;