import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useUsers = (companyName) => {
  const axios = useAxios();
  const { data: users = [], refetch: usersRefetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get(`/users`);

      return res.data;
    },
  });

  const isEmployee = users.filter((user) => user.companyName === companyName);

  return { users, usersRefetch, isEmployee };
};

export default useUsers;
