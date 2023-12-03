import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';
import useHR from './useHR';
import useAxiosSecure from './useAxiosSecure';

const useAllAssets = (asc, stockStatus, assetType, search, limitedItem) => {
  const axios = useAxiosSecure();
  const { userData } = useHR();
  const { user, loading } = useAuth();
  const {
    data: allAssets = [],
    refetch,
    isLoading: assetsLoading,
  } = useQuery({
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
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `/allAssets?email=${
          userData?.role === 'HR' ? userData?.email : undefined
        }&sort=${
          asc ? 'asc' : 'dsc'
        }&stockStatus=${stockStatus}&assetType=${assetType}&search=${search}&limitedItem=${limitedItem}`
      );

      return res.data;
    },
  });

  return { allAssets, refetch, assetsLoading };
};

export default useAllAssets;
