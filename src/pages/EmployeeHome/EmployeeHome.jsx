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

const EmployeeHome = () => {
  const { customRequestData } = useCustomRequestData();
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
      {!userData.companyName ? (
        <NotFoundData>
          You're not yet part of a team. Please contact your HR for guidance and
          support. They'll ensure you find the right fit for a more fulfilling
          and collaborative experience
        </NotFoundData>
      ) : (
        <>
          {!customRequestData.length ? (
            <></>
          ) : (
            <>
              <Title title="Custom request" />
              <div className="max-w-7xl xl:mx-auto mx-2 my-8 border-t border-b border-stone-400">
                <ul className="flex flex-col divide-y divide-stone-400">
                  {customRequestData.map((req, index) => (
                    <li key={index}>
                      <SingleItem req={req} />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <Title title="Pending request" />
          <PendingRequest />

          <Title title="Monthly Request" />
          <MonthlyRequest monthlyRequest={recentRequest} />

          <div className="pb-20">
            <Title title="Most Requested Items" />
            <RequestedItems requestData={requestData} />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeHome;
