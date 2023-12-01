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
      userData?.companyName,
      user?.email,
      searchUser,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/requestForAsset?email=${
          userData?.role !== 'HR' ? user?.email : ''
        }&companyName=${
          userData?.role === 'HR' ? userData?.companyName : ''
        }&requestStatus=${requestStatus}&assetType=${assetType}&search=${search}&searchUser=${searchUser}`
      );
      return res.data;
    },
  });

  return { requestData, refetch };
};

export default useRequestData;
