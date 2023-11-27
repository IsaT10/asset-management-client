import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAllAssets = (asc, stockStatus, assetType, search) => {
  const axios = useAxios();
  const { data: allAssets = [], refetch } = useQuery({
    queryKey: ['allAssets', asc, stockStatus, assetType, search],
    queryFn: async () => {
      const res = await axios.get(
        `/allAssets?sort=${
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
