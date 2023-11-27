import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';
import useHR from './useHR';

const useRequestData = (requestStatus, assetType, search, searchUser) => {
  const axios = useAxios();
  const { userData } = useHR();
  const { user } = useAuth();

  const { data: requestData = [], refetch } = useQuery({
    queryKey: [
      'requestData',
      requestStatus,
      assetType,
      search,
      user?.email,
      searchUser,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/requestForAsset?email=${
          userData?.role === 'employee' ? user.email : ''
        }&requestStatus=${requestStatus}&assetType=${assetType}&search=${search}&searchUser=${searchUser}`
      );
      return res.data;
    },
  });

  return { requestData, refetch };
};

export default useRequestData;
