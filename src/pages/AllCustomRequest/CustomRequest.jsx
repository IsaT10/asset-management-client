import { toast } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';

const CustomRequest = ({ reqData, refetch }) => {
  const axios = useAxios();
  const approvalDate = new Date();
  const handleApprove = async (id) => {
    const res = await axios.patch(`/custom-request/${id}`, {
      approvalDate,
      status: 'Approved',
    });

    if (res?.data?.modifiedCount) {
      toast.success('Approve request');

      refetch();
    }
    // console.log(res.data);
  };

  const handleReject = async (id) => {
    const res = await axios.patch(`/custom-request/${id}`, {
      status: 'Rejected',
    });

    if (res?.data?.modifiedCount) {
      toast.warning('Reject request');
      refetch();
    }
    // console.log(res.data);
  };

  return (
    <tbody className="">
      <tr className="border-b-2 border-stone-200">
        <td className="w-20">
          <p className="text-stone-200 font-semibold  ">{reqData?.assetName}</p>
        </td>
        <td className="w-20">
          <p className="text-stone-200 font-semibold  ">${reqData?.price}</p>
        </td>
        <td className="w-20">
          <img
            className="h-20 w-full object-cover"
            src={reqData?.imageUrl}
            alt=""
          />
        </td>
        <td className=" font-semibold text-center w-20">
          <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
            {reqData?.type}
          </p>
        </td>
        <td className="text-stone-200 font- ">
          {reqData?.whyNeedThis}sadsad ahsg hyvahysvch ahsv asvas
        </td>
        <td className="text-stone-200 font-">{reqData?.info}</td>

        <td className="text-stone-200 font-semibold w-20">
          <span
            className={`${
              reqData?.status === 'Pending'
                ? 'font-semibold uppercase text-xs text-orange-500'
                : reqData?.status === 'Approved'
                ? 'font-semibold uppercase text-xs text-green-500'
                : 'font-semibold uppercase text-xs text-red-600'
            }`}
          >
            {reqData?.status}
          </span>
        </td>

        <td className=" text-center w-20">
          {reqData?.status === 'Approved' || reqData?.status === 'Rejected' ? (
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
        </td>

        <td className=" text-center w-20">
          {reqData?.status === 'Approved' || reqData?.status === 'Rejected' ? (
            <button
              disabled
              className="font-semibold text-xs uppercase px-3 py-1.5 bg-red-600 text-white rounded-sm opacity-30"
            >
              Reject
            </button>
          ) : (
            <button
              onClick={() => handleReject(reqData._id)}
              className="font-semibold text-xs uppercase px-3 py-1.5 bg-red-600 text-white rounded-sm"
            >
              Reject
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default CustomRequest;
