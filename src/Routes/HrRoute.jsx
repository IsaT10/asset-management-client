import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useHR from '../Hooks/useHR';

const HrRoute = ({ children }) => {
  const { userData, isLoading } = useHR();
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(userData.payment);
  console.log('user', user);

  console.log(isLoading, loading);
  console.log(userData.role);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] text-white flex flex-col items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!user || !userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.payment === 'require') {
    return <Navigate to="/payment" />;
  }

  if (userData?.role === 'employee') {
    return <Navigate to="/" />;
  }
  if (user && userData?.role === 'HR') {
    return children;
  }
};

export default HrRoute;
