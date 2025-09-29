import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from './LandingPage';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
};

export default Index;
