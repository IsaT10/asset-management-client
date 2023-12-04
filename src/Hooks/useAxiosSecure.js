import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'https://asset-management-server-rho.vercel.app',
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // console.log(response);
      return response;
    },
    (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logOut();
        navigate('/login');
      }
      console.log('error', status);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
