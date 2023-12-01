import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';
import useHR from './useHR';

const useAllAssets = (asc, stockStatus, assetType, search, limitedItem) => {
  const axios = useAxios();
  const { userData } = useHR();
  const { user } = useAuth();
  const { data: allAssets = [], refetch } = useQuery({
    queryKey: [
      'allAssets',
      asc,
      stockStatus,
      assetType,
      search,
      user?.email,
      limitedItem,
      userData?.email,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/allAssets?email=${
          userData?.role === 'HR' ? userData?.email : undefined
        }&sort=${
          asc ? 'asc' : 'dsc'
        }&stockStatus=${stockStatus}&assetType=${assetType}&search=${search}&limitedItem=${limitedItem}`
      );
      console.log(res.data);

      return res.data;
    },
  });

  return { allAssets, refetch };
};

export default useAllAssets;
