// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Loader from '../ui/Loader';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!isAuthenticated) {
//     // Redirect to login page, but save the current location they were trying to access
//     return <Navigate to="/admin/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../ui/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
