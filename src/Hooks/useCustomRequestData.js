import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useCustomRequestData = () => {
  const axios = useAxios();
  const { data: customRequestData = [], refetch } = useQuery({
    queryKey: ['customRequest'],
    queryFn: async () => {
      const res = await axios.get(`/custom-request`);
      //   console.log(res?.data);
      return res.data;
    },
  });

  return { customRequestData, refetch };
};

export default useCustomRequestData;
