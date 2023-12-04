import { toast } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';
import { date } from '../../utils/date';
import { FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Asset = ({ reqData, refetch }) => {
  const axios = useAxios();
  const { formattedDate: requestedDate } = date(reqData.requestedDate);
  const { formattedDate: approvalDate } = date(reqData.approvalDate);

  const handleCancelRequest = async () => {
    const res = await axios.delete(`/requestForAsset/${reqData?._id}`);
    if (res.data.deletedCount) {
      refetch();
      toast.error('Cancel Request');
    }
  };

  const handleReturn = async () => {
    const res = await axios.patch(`/requestForAsset/${reqData?._id}`, {
      status: 'Returned',
      productName: reqData?.assetName,
    });

    if (res?.data?.updateProductQuantity?.modifiedCount) {
      toast.success('Returned Product');
      refetch();
    }
    // console.log(res?.data?.updateProductQuantity?.modifiedCount);
  };
  return (
    <tbody className="">
      <tr className="border-b-2 border-stone-200">
        <td className="w-40">
          <p className="text-stone-200 font-semibold md:text-lg ">
            {reqData?.assetName}
          </p>
        </td>
        <td className=" font-semibold w-52">
          <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
            {reqData?.type}
          </p>
        </td>
        <td className=" font-josep font-semibold text-stone-200  w-52">
          {requestedDate}
        </td>
        <td className="text-stone-200 font-semibold w-40">
          {reqData?.approvalDate ? <p>{approvalDate}</p> : ''}
        </td>
        <td className="w-44">
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

        <td className="w-44 text-center">
          {reqData?.status === 'Pending' ? (
            <button
              onClick={handleCancelRequest}
              className="font-semibold text-sm uppercase px-3 py-1 bg-red-600 text-white rounded-sm"
            >
              Cancel
            </button>
          ) : reqData?.status === 'Approved' ? (
            <div className="flex items-center gap-2 justify-center ml-7">
              <button
                onClick={handleReturn}
                disabled={reqData?.type === 'Non-returnable'}
                className="font-semibold disabled:opacity-40 text-sm uppercase px-3 py-1 bg-blue text-white rounded-sm"
              >
                Return
              </button>
              <div className="tooltip tooltip-top" data-tip="Print">
                <Link to="/details" className="cursor-pointer ">
                  <FaPrint className=" text-xl text-stone-300 mt-1" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {reqData?.status === 'Returned' ? (
                <button
                  disabled={reqData?.status === 'Returned'}
                  className="font-semibold disabled:opacity-40 text-sm uppercase px-3 py-1 bg-blue text-white rounded-sm"
                >
                  Return
                </button>
              ) : (
                ''
              )}
            </>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Asset;
