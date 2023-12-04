import { toast } from 'react-toastify';
import useAxios from '../../../Hooks/useAxios';
import { date } from '../../../utils/date';

const MonthlyRequest = ({ data }) => {
  const { formattedDate } = date(data?.requestedDate);
  const { formattedDate: approvalDate } = date(data?.approvalDate);

  return (
    <>
      <div className="bg-stone-100 w-[340px] sm:w-[400px] md:w-[360px] lg:w-[390px] mx-auto rounded-md flex-col flex items-start px-10 py-6 ">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
          {data?.assetName}
        </h3>
        <p className="text-xs rounded-full font-semibold text-stone-200 bg-blue px-2 py-0.5 ">
          {data?.type}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <p>
            Employee Name : <span className=" font-semibold">{data?.name}</span>
          </p>
          <p className=" font-semibold">
            <span className="font-normal">Requested Date : </span>
            {formattedDate}
          </p>

          {data?.approvalDate ? (
            <p className=" font-semibold">
              <span className="font-normal">Approval Date :</span>
              {approvalDate}
            </p>
          ) : (
            ''
          )}
          <p>
            Status :{' '}
            <span
              className={`${
                data?.status === 'Pending'
                  ? 'font-semibold uppercase text-orange-500'
                  : data?.status === 'Approved'
                  ? 'font-semibold uppercase text-green-500'
                  : data?.status === 'Rejected'
                  ? 'font-semibold uppercase text-red-600'
                  : 'font-semibold uppercase text-blue'
              }`}
            >
              {data?.status}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MonthlyRequest;
