import { toast } from 'react-toastify';
import useAxios from '../../../Hooks/useAxios';
import { date } from '../../../utils/date';

const MonthlyRequest = ({ monthlyRequest }) => {
  return (
    <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
      <div className="overflow-x-auto rounded-t-md">
        <table className="table rounded-t-md">
          {/* head */}
          <thead className="bg-stone-600 text-stone-100 ">
            <tr className="">
              <th>Asset Name</th>
              <th>Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th className="text-center">Request Status</th>
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}

            {monthlyRequest?.map((reqData, i) => {
              const { formattedDate } = date(reqData?.requestedDate);
              const { formattedDate: approvalDate } = date(
                reqData?.approvalDate
              );

              return (
                <tr key={i} className="border-b-2 border-stone-200">
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
                    {formattedDate}
                  </td>
                  <td className="text-stone-200 font-semibold w-40">
                    {reqData?.approvalDate ? <p>{approvalDate}</p> : ''}
                  </td>
                  <td className="w-44 text-center">
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyRequest;
