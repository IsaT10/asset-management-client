import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useHR from './useHR';
import useAxiosSecure from './useAxiosSecure';
// import { useState } from 'react';

const useRequestData = (requestStatus, assetType, search, searchUser) => {
  // const [pageNumber, setPageNumber] = useState(0);
  // const itemPerPage = 10;
  // const lastIndex = pageNumber * itemPerPage;
  // const firstIndex = lastIndex - itemPerPage + 1;

  const axios = useAxiosSecure();
  const { userData } = useHR();
  const { user, loading } = useAuth();

  const {
    data: requestData = [],
    refetch,
    isLoading: reqDataLoading,
  } = useQuery({
    queryKey: [
      'requestData',
      requestStatus,
      assetType,
      search,
      userData?.companyName,
      user?.email,
      searchUser,
      // pageNumber,
      // itemPerPage,
    ],
    enabled: !loading,
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

  return {
    requestData,
    refetch,
    reqDataLoading,

    // pageNumber,
    // setPageNumber,
    // itemPerPage,

    // lastIndex,
    // firstIndex,
  };
};

export default useRequestData;
