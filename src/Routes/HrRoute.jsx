import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useHR from '../Hooks/useHR';

const HrRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { userData } = useHR();
  console.log(userData);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] text-white flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.role !== 'HR' || userData?.payment !== 'complete') {
    return <Navigate to="/payment" />;
  }
  return children;
};

export default HrRoute;
