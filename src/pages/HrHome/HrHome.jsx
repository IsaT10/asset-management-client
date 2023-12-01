import useRequestData from '../../Hooks/useRequestData';
import Title from '../../components/Title';
import PendingRequest from './Section/PendingRequest';
import LimitedItems from './Section/LimitedItems';
import RequestedItems from './Section/RequestedItems';
import Piechart from './Section/PieChart';

const HrHome = () => {
  const { requestData } = useRequestData('', '', '', '');
  const pendingReq = requestData.filter((data) => data.status === 'Pending');

  return (
    <div className="">
      <Title title="Pending Request" />
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

      <Title title="Most Requested Items" />
      <RequestedItems requestData={requestData} />

      <Title title="Employee Preference Analysis" />
      <Piechart requestData={requestData} />

      <Title title="Limited Items" />
      <div>
        <LimitedItems />
      </div>
    </div>
  );
};

export default HrHome;
