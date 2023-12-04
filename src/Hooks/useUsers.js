import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import useAxios from './useAxios';

const useUsers = (companyName) => {
  const axios = useAxios();
  const { user, loading } = useAuth();
  const { data: users = [], refetch: usersRefetch } = useQuery({
    queryKey: ['user', user],

    queryFn: async () => {
      const res = await axios.get(`/users`);

      return res.data;
    },
  });

  const isEmployee = users.filter((user) => user.companyName === companyName);

  return { users, usersRefetch, isEmployee };
};

export default useUsers;
