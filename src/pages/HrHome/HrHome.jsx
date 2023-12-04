import useRequestData from '../../Hooks/useRequestData';
import Title from '../../components/Title';
import LimitedItems from './Section/LimitedItems';
import RequestedItems from './Section/RequestedItems';
import Piechart from './Section/PieChart';
import HelmetTag from '../../components/HelmetTag';
import RequestAnalysis from './Section/RequestAnalysis';
import TopRequester from './Section/TopRequester';
import NotFoundData from '../../components/NotFoundData';
import Loader from '../../components/Loader';
import PendingCard from '../../components/PendingCard';

const HrHome = () => {
  const { requestData, reqDataLoading } = useRequestData('', '', '', '');
  const pendingReq = requestData.filter((data) => data.status === 'Pending');

  return (
    <div className="pb-10">
      <HelmetTag title="Home | HR" />
      <Title title="Pending Request" />
      {reqDataLoading ? (
        <Loader className="h-[40vh]" />
      ) : (
        <>
          {' '}
          {pendingReq?.length ? (
            <PendingCard />
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
          <div className="mt-20">
            <Title title=" Limited Stock Assets" />
          </div>
          <LimitedItems />
          <Title title="Employee Request Analysis" />
          {requestData?.length ? (
            <RequestAnalysis requestData={requestData} />
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
          <div className="mt-20">
            <Title title="Top Requesters" />
          </div>
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
