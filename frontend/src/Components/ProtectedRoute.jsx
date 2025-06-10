import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { api } from './api/data';

const ProtectedRoute = ({ children }) => {
  const { token} = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
