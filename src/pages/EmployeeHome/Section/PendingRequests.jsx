import useRequestData from '../../../Hooks/useRequestData';
import { date } from '../../../utils/date';
import NotFoundData from '../../../components/NotFoundData';

const PendingRequests = () => {
  const { requestData } = useRequestData('Pending', '', '', '');

  return (
    <>
      {requestData?.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {requestData?.map((data) => {
              console.log(data);
              const { formattedDate } = date(data?.requestedDate);
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

export default PendingRequests;
