import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import SingleItem from './SingleItem';
import useCustomRequestData from '../../Hooks/useCustomRequestData';
import useRequestData from '../../Hooks/useRequestData';
import PendingRequest from './Section/PendingRequest';
import { date } from '../../utils/date';
import MonthlyRequest from './Section/MonthlyRequest';

const EmployeeHome = () => {
  const { customRequestData } = useCustomRequestData();
  const { requestData } = useRequestData('', '', '');
  console.log(requestData);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyRequest = requestData.filter((item) => {
    const itemDate = new Date(item.requestedDate);
    console.log(itemDate);
    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    );
  });

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

  const frequentlyRequest = requestData.reduce((acc, cur) => {
    acc[cur.assetName] = (acc[cur.assetName] || 0) + 1;
    return acc;
  }, {});

  console.log(frequentlyRequest);

  // const pendingRequest = customRequestData.filter(
  //   (item) => item.status === 'pending'
  // );
  // const approvedRequest = customRequestData.filter(
  //   (item) => item.status === 'approved'
  // );

  // console.log(pendingRequest, approvedRequest);

  return (
    <div className="min-h-screen">
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

      <Title title="Pending request" />
      <PendingRequest />

      <Title title="Monthly Request" />
      <MonthlyRequest monthlyRequest={monthlyRequest} />
    </div>
  );
};

export default EmployeeHome;
