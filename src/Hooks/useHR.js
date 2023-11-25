import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useHR = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { data: isHR = {} } = useQuery({
    queryKey: ['HR', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/HR/${user.email}`);

      return res.data;
    },
  });

  return { isHR };
};

export default useHR;
