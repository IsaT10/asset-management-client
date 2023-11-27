const CustomRequest = ({ reqData, refetch }) => {
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
                : 'font-semibold uppercase text-xs text-green-500'
            }`}
          >
            {reqData?.status}
          </span>
        </td>

        <td className=" text-center w-20">
          {reqData?.status === 'Approved' ? (
            <button
              disabled
              className="font-semibold text-xs uppercase px-3 py-1.5 opacity-30 bg-green-600 text-white rounded-sm"
            >
              Approve
            </button>
          ) : (
            <button className="font-semibold text-xs uppercase px-3 py-1.5 bg-green-600 text-white rounded-sm">
              Approve
            </button>
          )}
        </td>

        <td className=" text-center w-20">
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

export default CustomRequest;
