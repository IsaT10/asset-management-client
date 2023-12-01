import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';

const GoogleLogIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axios = useAxios();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = () => {
    googleSignIn().then(async (result) => {
      console.log(result.user.photoURL);
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        role: 'employee',
        companyName: '',
        image: result.user.photoURL,
      };
      const res = await axios.post('/users', userInfo);

      console.log(res.data);
      toast.success('Successfully signup');
      navigate(from, { replace: true });
    });
  };
  return (
    <div
      onClick={handleGoogleSignIn}
      className="cursor-pointer border-2 border-blue rounded-full p-1.5"
    >
      <FaGoogle className="" />
    </div>
  );
};

export default GoogleLogIn;
