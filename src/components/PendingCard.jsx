import { toast } from 'react-toastify';
import useAxios from '../Hooks/useAxios';
import { date } from '../utils/date';
import useHR from '../Hooks/useHR';
import useRequestData from '../Hooks/useRequestData';
import NotFoundData from './NotFoundData';

const PendingCard = () => {
  const { requestData, reqDataLoading, refetch } = useRequestData(
    'Pending',
    '',
    '',
    ''
  );

  const { userData } = useHR();
  const axios = useAxios();

  return (
    <>
      {requestData?.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {requestData?.slice(0, 5).map((data) => {
              console.log(data);
              const { formattedDate } = date(data?.requestedDate);
              const handleApprove = async () => {
                const approvalDate = new Date();
                const res = await axios.patch(`/requestForAsset/${data?._id}`, {
                  approvalDate,
                  status: 'Approved',
                  productName: data?.assetName,
                });

                if (res?.data?.result?.modifiedCount) {
                  refetch();
                  toast.success('Approve request');
                }
                // console.log(res.data);
              };

              const handleReject = async () => {
                const res = await axios.patch(`/requestForAsset/${data?._id}`, {
                  status: 'Rejected',
                });

                console.log(res?.data?.result?.modifiedCount);
                if (res?.data?.result?.modifiedCount) {
                  refetch();
                  toast.warning('Reject request');
                }
              };

              // const handleCancelRequest = async () => {
              //   const res = await axios.delete(`/requestForAsset/${data?._id}`);
              //   if (res.data.deletedCount) {
              //     refetch();
              //     toast.error('Cancel Request');
              //   }
              // };
              return (
                <div className="bg-stone-100 w-[340px] sm:w-[400px] md:w-[360px] lg:w-[390px] mx-auto rounded-md flex-col flex items-start px-10 py-6 ">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    {data?.assetName}
                  </h3>
                  <p className="text-xs rounded-full font-semibold text-stone-200 bg-blue px-2 py-0.5 ">
                    {data?.type}
                  </p>
                  <div className="flex flex-col gap-2 mt-4">
                    <p>
                      Employee Name :{' '}
                      <span className=" font-semibold">{data?.name}</span>
                    </p>
                    <p className=" font-semibold">
                      <span className="font-normal">Requested Date : </span>
                      {formattedDate}
                    </p>
                    <p>
                      Status :{' '}
                      <span className="text-orange-500 font-semibold">
                        {data?.status}
                      </span>
                    </p>
                  </div>

                  {userData?.role === 'employee' ? (
                    ''
                  ) : (
                    <div className="mt-8 flex w-full justify-between items-center">
                      <button
                        onClick={handleApprove}
                        className="font-semibold text-sm px-4 py-1 rounded-sm bg-green-600 text-green-100"
                      >
                        Approve
                      </button>
                      <button
                        onClick={handleReject}
                        className="font-semibold text-sm px-4 py-1 rounded-sm bg-red-600 text-red-100"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <NotFoundData className="h-[50vh] text-center">
          No Data Available
        </NotFoundData>
      )}
    </>
  );
};

export default PendingCard;
