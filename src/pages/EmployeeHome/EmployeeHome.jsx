import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import SingleItem from './SingleItem';
import useCustomRequestData from '../../Hooks/useCustomRequestData';
import useRequestData from '../../Hooks/useRequestData';
import PendingRequest from './Section/PendingRequest';
import { date } from '../../utils/date';
import MonthlyRequest from './Section/MonthlyRequest';
import useHR from '../../Hooks/useHR';
import NotFoundData from '../../components/NotFoundData';
import RequestedItems from '../HrHome/Section/RequestedItems';
import HelmetTag from '../../components/HelmetTag';
import Loader from '../../components/Loader';

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

  // console.log(recentRequest);

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
                  <div className="  bg-stone-950 mx-4 md:mx-auto">
                    <div className="overflow-x-auto rounded-t-md">
                      <table className="table rounded-t-md">
                        {/* head */}
                        <thead className="bg-stone-600 text-stone-100 ">
                          <tr className="">
                            <th>Asset Name</th>
                            <th>Price</th>
                            <th>Asset Image</th>
                            <th>Asset Type</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        {customRequestData?.map((reqData, i) => (
                          <SingleItem
                            reqData={reqData}
                            key={i}
                            refetch={refetch}
                          />
                        ))}
                      </table>
                    </div>
                  </div>
                  {/* <div className="max-w-7xl xl:mx-auto mx-2 my-8 border-t border-b border-stone-400">
                <ul className="flex flex-col divide-y divide-stone-400">
                  {customRequestData.map((req, index) => (
                    <li key={index}>
                      <SingleItem req={req} />
                    </li>
                  ))}
                </ul>
              </div> */}
                </>
              )}

              <Title title="Pending requests" />
              <PendingRequest />

              <Title title="Monthly Requests" />
              {monthlyRequest?.length ? (
                <MonthlyRequest monthlyRequest={recentRequest} />
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
