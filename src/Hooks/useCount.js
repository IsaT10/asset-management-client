import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useHR from './useHR';

const useCount = () => {
  const axios = useAxiosSecure();
  const { userData } = useHR();

  const { data: count = {} } = useQuery({
    queryKey: ['count', userData?.companyName],
    queryFn: async () => {
      const res = await axios.get(
        `/requestForAsset/count?companyName=${userData?.companyName}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  return { count };
};

export default useCount;
