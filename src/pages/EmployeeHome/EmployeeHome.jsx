import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import SingleItem from './SingleItem';
import useRequestData from '../../Hooks/useRequestData';

const EmployeeHome = () => {
  const { customRequestData } = useRequestData();

  const pendingRequest = customRequestData.filter(
    (item) => item.status === 'pending'
  );
  const approvedRequest = customRequestData.filter(
    (item) => item.status === 'approved'
  );

  console.log(pendingRequest, approvedRequest);

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
    </div>
  );
};

export default EmployeeHome;
