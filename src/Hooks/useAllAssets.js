import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useAllAssets = (asc, stockStatus, assetType, search) => {
  const axios = useAxios();
  const { user } = useAuth();
  const { data: allAssets = [], refetch } = useQuery({
    queryKey: ['allAssets', asc, stockStatus, assetType, search, user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `/allAssets?email=${user.email}&sort=${
          asc ? 'asc' : 'dsc'
        }&stockStatus=${stockStatus}&assetType=${assetType}&search=${search}`
      );
      console.log(res.data);

      return res.data;
    },
  });

  return { allAssets };
};

export default useAllAssets;
