import useRequestData from '../../Hooks/useRequestData';
import Title from '../../components/Title';
import PendingRequest from './Section/PendingRequest';
import LimitedItems from './Section/LimitedItems';
import RequestedItems from './Section/RequestedItems';
import Piechart from './Section/PieChart';
import HelmetTag from '../../components/HelmetTag';
import RequestAnalysis from './Section/RequestAnalysis';
import TopRequester from './Section/TopRequester';
import NotFoundData from '../../components/NotFoundData';
import Loader from '../../components/Loader';

const HrHome = () => {
  const { requestData, reqDataLoading } = useRequestData('', '', '', '');
  const pendingReq = requestData.filter((data) => data.status === 'Pending');

  return (
    <div className="">
      <HelmetTag title="Home | HR" />
      <Title title="Pending Request" />
      {reqDataLoading ? (
        <Loader className="h-[40vh]" />
      ) : (
        <>
          {' '}
          {pendingReq?.length ? (
            <>
              <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
                <div className="overflow-x-auto rounded-t-md">
                  <table className="table rounded-t-md">
                    {/* head */}
                    <thead className="bg-stone-600 text-stone-100 ">
                      <tr className="">
                        <th>Asset Name</th>
                        <th>Type</th>
                        <th>Team Member Name</th>
                        <th>Request Status</th>
                      </tr>
                    </thead>

                    {pendingReq?.slice(0, 5).map((data) => (
                      <PendingRequest data={data} key={data._id} />
                    ))}
                  </table>
                </div>
              </div>
            </>
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
          <Title title="Most Requested Items" />
          {requestData?.length ? (
            <RequestedItems requestData={requestData} />
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
          <Title title="Employee Preference Analysis" />
          {requestData?.length ? (
            <Piechart requestData={requestData} />
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
          <Title title=" Limited Stock Assets" />
          <LimitedItems />
          <Title title="Employee Request Analysis" />
          {requestData?.length ? (
            <RequestAnalysis requestData={requestData} />
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
          <Title title="Top Requesters" />
          {requestData?.length ? (
            <TopRequester requestData={requestData} />
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
        </>
      )}
    </div>
  );
};

export default HrHome;
