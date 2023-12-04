import Title from '../../components/Title';
import useCustomRequestData from '../../Hooks/useCustomRequestData';
import useRequestData from '../../Hooks/useRequestData';
import MonthlyRequest from './Section/MonthlyRequest';
import useHR from '../../Hooks/useHR';
import NotFoundData from '../../components/NotFoundData';
import RequestedItems from '../HrHome/Section/RequestedItems';
import HelmetTag from '../../components/HelmetTag';
import Loader from '../../components/Loader';
import PendingCard from '../../components/PendingCard';
import CustomRequestCard from '../../components/CustomRequestCard';
import PendingRequests from './Section/PendingRequests';

const EmployeeHome = () => {
  const { customRequestData, refetch, customReqLoading } =
    useCustomRequestData();
  const { requestData } = useRequestData('', '', '', '');
  const { userData } = useHR();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyRequest = requestData.filter((item) => {
    const itemDate = new Date(item.requestedDate);
    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    );
  });

  const recentRequest = monthlyRequest.sort((a, b) => {
    if (a.requestedDate > b.requestedDate) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(recentRequest);

  // const arr = [];
  // const frequnetly = requestData.filter((item) => {
  //   const name = item.assetName;
  //   arr.push(name);
  //   console.log(name);
  //   return;
  // });
  // console.log(arr);

  // const iio = arr.reduce((acc, cur) => {
  //   acc[cur] = (acc[cur] || 0) + 1;
  //   return acc;
  // }, {});

  // const frequentlyRequest = requestData.reduce((acc, cur) => {
  //   acc[cur.assetName] = (acc[cur.assetName] || 0) + 1;
  //   return acc;
  // }, {});

  // console.log(frequentlyRequest);

  // const pendingRequest = customRequestData.filter(
  //   (item) => item.status === 'pending'
  // );
  // const approvedRequest = customRequestData.filter(
  //   (item) => item.status === 'approved'
  // );

  // console.log(pendingRequest, approvedRequest);

  return (
    <div className="">
      <HelmetTag title="Home | Employee" />
      {!userData.companyName ? (
        <NotFoundData>
          You're not yet part of a team. Please contact your HR for guidance and
          support.
        </NotFoundData>
      ) : (
        <>
          {customReqLoading ? (
            <Loader className="h-[80vh]" />
          ) : (
            <>
              {!customRequestData.length ? (
                <></>
              ) : (
                <>
                  <Title title="Custom Requests" />
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {customRequestData?.map((data, i) => (
                      <CustomRequestCard data={data} key={i} />
                    ))}
                  </div>
                </>
              )}

              <Title title="Pending requests" />
              <PendingRequests />

              <Title title="Monthly Requests" />
              {monthlyRequest?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {monthlyRequest?.map((data, i) => (
                    <MonthlyRequest data={data} key={i} />
                  ))}
                </div>
              ) : (
                <NotFoundData className="h-[40vh]">
                  No Data Available!
                </NotFoundData>
              )}

              <div className="pb-20">
                <Title title="Frequently Requested Items" />
                {requestData?.length ? (
                  <RequestedItems requestData={requestData} />
                ) : (
                  <NotFoundData className="h-[40vh]">
                    No Data Available!
                  </NotFoundData>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeHome;
