import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://asset-management-server-rho.vercel.app',
  // baseURL: 'http://localhost:5000',
});

const useAxios = () => {
  return instance;
};

export default useAxios;
