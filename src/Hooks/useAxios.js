import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://asset-management-server-rho.vercel.app',
});

const useAxios = () => {
  return instance;
};

export default useAxios;
