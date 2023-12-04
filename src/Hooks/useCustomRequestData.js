import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';
import useHR from './useHR';
import useAxiosSecure from './useAxiosSecure';

const useCustomRequestData = () => {
  const axios = useAxiosSecure();
  const { userData } = useHR();
  // console.log(userData.role);
  const { user, loading } = useAuth();
  const {
    data: customRequestData = [],
    refetch,
    isLoading: customReqLoading,
  } = useQuery({
    queryKey: [
      'customRequest',
      user?.email,
      userData?.companyName,
      userData?.role,
    ],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `/custom-request?email=${
          userData?.role !== 'HR' ? user?.email : ''
        }&companyName=${userData?.role === 'HR' ? userData?.companyName : ''}`
      );
      //   console.log(res?.data);
      return res.data;
    },
  });

  return { customRequestData, refetch, customReqLoading };
};

export default useCustomRequestData;
