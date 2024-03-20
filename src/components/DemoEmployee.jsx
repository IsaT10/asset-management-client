import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DemoEmployee = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleDemoEmployee = () => {
    logIn('mango@khai.com', 'aA1!11')
      .then((result) => {
        toast.success('Successfully Login');
        navigate('/');
      })
      .catch((err) => {
        if (err.code === 'auth/network-request-failed') {
          toast.err('Network request failed');
          return;
        }
      });
  };
  return (
    <button
      className="border-2 hover:bg-blue duration-200 hover:text-white border-blue text-blue px-4 py-2 font-semibold rounded-md"
      onClick={handleDemoEmployee}
    >
      Demo Employee
    </button>
  );
};

export default DemoEmployee;
