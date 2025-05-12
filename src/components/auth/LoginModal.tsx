import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, EyeIcon, EyeOffIcon, Shield, User } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setSignupSuccess(false);
      setIsSignup(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignup) {
        if (!name.trim()) {
          throw new Error('Name is required');
        }
        const signupSuccess = await signup(name, email, password);
        if (signupSuccess) {
          setSignupSuccess(true);
          setIsSignup(false);
          setEmail('');
          setPassword('');
          setName('');
          setError('');
        } else {
          setError('Failed to create account');
        }
      } else {
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          onClose();
          setEmail('');
          setPassword('');
          navigate('/');
        } else {
          setError('Invalid credentials');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>

          {signupSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
              Account created successfully! Please login.
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isSignup && (
              <div className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setIsSignup(false);
                    setError('');
                    setSignupSuccess(false);
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setIsSignup(true);
                    setError('');
                    setSignupSuccess(false);
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
