import useAxios from '../../Hooks/useAxios';
import { date } from '../../utils/date';

const Request = ({ reqData, refetch }) => {
  const axios = useAxios();
  const { formattedDate } = date(reqData?.requestedDate);
  const approvalDate = new Date();
  const handleApprove = async (id) => {
    const res = await axios.patch(`/requestForAsset/${id}`, {
      approvalDate,
    });

    if (res?.data?.modifiedCount) {
      refetch();
    }
    console.log(res.data);
  };
  return (
    <tbody className="">
      <tr className="border-b-2 border-stone-200">
        <td className="">
          <p className="text-stone-200 font-semibold  ">{reqData?.assetName}</p>
        </td>
        <td className=" font-semibold text-center">
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
                : 'font-semibold uppercase text-xs text-green-500'
            }`}
          >
            {reqData?.status}
          </span>
        </td>

        <td className=" text-center">
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
        </td>

        <td className=" text-center">
          {reqData?.status === 'Approved' ? (
            <button
              disabled
              className="font-semibold text-xs uppercase px-3 py-1.5 bg-red-600 text-white rounded-sm opacity-30"
            >
              Reject
            </button>
          ) : (
            <button className="font-semibold text-xs uppercase px-3 py-1.5 bg-red-600 text-white rounded-sm">
              Reject
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Request;
