import { toast } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';
import { date } from '../../utils/date';
import useAllAssets from '../../Hooks/useAllAssets';

const Request = ({ reqData, refetch }) => {
  const axios = useAxios();
  // const {} = useAllAssets();
  const { formattedDate } = date(reqData?.requestedDate);
  const approvalDate = new Date();
  const handleApprove = async (id) => {
    const res = await axios.patch(`/requestForAsset/${id}`, {
      approvalDate,
      status: 'Approved',
      productName: reqData?.assetName,
    });

    if (res?.data?.result?.modifiedCount) {
      toast.success('Approve request');

      refetch();
    }
    // console.log(res.data);
  };

  const handleReject = async (id) => {
    // console.log(id);
    const res = await axios.patch(`/requestForAsset/${id}`, {
      status: 'Rejected',
    });

    // console.log(res.data.result);

    if (res?.data?.result?.modifiedCount) {
      toast.warning('Reject request');
      refetch();
    }
  };

  return (
    <tbody className="">
      <tr className="border-b-2 border-stone-200">
        <td className="">
          <p className="text-stone-200 font-semibold  ">{reqData?.assetName}</p>
        </td>
        <td className=" font-semibold ">
          <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
            {reqData?.type}
          </p>
        </td>
        <td className=" font-josep font-semibold text-stone-200 w-28">
          {reqData?.name}
        </td>
        <td className="text-stone-200 font- w-40">{reqData?.email}</td>
        <td className="text-stone-200 font- w-40">{reqData?.additionalInfo}</td>
        <td className="text-stone-200 text-xs font-semibold ">
          {formattedDate}
        </td>
        <td className="text-stone-200 font-semibold ">
          <span
            className={`${
              reqData?.status === 'Pending'
                ? 'font-semibold uppercase text-xs text-orange-500'
                : reqData?.status === 'Approved'
                ? 'font-semibold uppercase text-xs text-green-500'
                : reqData?.status === 'Rejected'
                ? 'font-semibold uppercase text-xs text-red-600'
                : 'font-semibold uppercase text-xs text-blue'
            }`}
          >
            {reqData?.status}
          </span>
        </td>

        <td className=" text-center">
          {reqData?.status === 'Rejected' || reqData?.status === 'Returned' ? (
            <></>
          ) : (
            <>
              {' '}
              {reqData?.status === 'Approved' ? (
                <button
                  disabled
                  className="font-semibold text-xs uppercase px-3 py-1.5 opacity-30 bg-green-600 text-white rounded-sm"
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => handleApprove(reqData._id)}
                  className="font-semibold text-xs uppercase px-3 py-1.5 bg-green-600 text-white rounded-sm"
                >
                  Approve
                </button>
              )}
            </>
          )}
        </td>

        <td className=" text-center">
          {reqData?.status === 'Rejected' || reqData?.status === 'Returned' ? (
            <></>
          ) : (
            <>
              {reqData?.status === 'Approved' ? (
                <button
                  disabled
                  className="font-semibold text-xs uppercase px-3 py-1.5 bg-red-600 text-white rounded-sm opacity-30"
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={() => handleReject(reqData?._id)}
                  className="font-semibold text-xs uppercase px-3 py-1.5 bg-red-600 text-white rounded-sm"
                >
                  Reject
                </button>
              )}
            </>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Request;
