import { useState } from 'react';
import useRequestData from '../../Hooks/useRequestData';

import Request from './Request';
import Title from '../../components/Title';

const AllRequest = () => {
  const [searchUser, setSearchUser] = useState('');
  const { requestData, refetch } = useRequestData('', '', '', searchUser);
  //   console.log(requestData);
  return (
    <div className="min-h-screen">
      <Title title="All Request" />
      <input
        type="text"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <div className="  bg-stone-950 mx-4 md:mx-auto px-3 py-10 ">
        <div className="overflow-x-auto rounded-t-md">
          <table className="table rounded-t-md">
            {/* head */}
            <thead className="bg-stone-600 text-stone-100 ">
              <tr className="">
                <th className="text-base font-medium">Asset Name</th>
                <th className="text-center text-base font-medium">Type</th>
                <th className="text-base font-medium">Name of requester</th>
                <th className="text-base font-medium">Email of requester</th>
                <th className="text-base font-medium">Additional note</th>
                <th className="text-base font-medium">Request Date</th>
                <th className="text-base font-medium">Status</th>

                <th className="text-base font-medium text-center">Action</th>
                <th className="text-base font-medium text-center">Action</th>
              </tr>
            </thead>
            {requestData?.map((reqData, i) => (
              <Request reqData={reqData} key={i} refetch={refetch} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRequest;
