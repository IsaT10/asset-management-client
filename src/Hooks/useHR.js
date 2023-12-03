import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';
import useAxiosSecure from './useAxiosSecure';

const useHR = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();
  const {
    data: userData = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['HR', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`/users/HR/${user.email}`);

      return res.data;
    },
  });

  return { userData, refetch, isLoading };
};

export default useHR;
