import { useState } from 'react';
import Title from '../../components/Title';
import useRequestData from '../../Hooks/useRequestData';
import Asset from './Asset';
import HelmetTag from '../../components/HelmetTag';

const MyAssets = () => {
  const [requestStatus, setRequestStatus] = useState('all');
  const [assetType, setAssetType] = useState('all');
  const [search, setSearch] = useState('');
  const { requestData, refetch } = useRequestData(
    requestStatus,
    assetType,
    search,
    ''
  );

  return (
    <div className="min-h-screen">
      <HelmetTag title="My Assets | Employee" />
      <Title title="Assets List" />

      <div className="flex justify-between items-start">
        <div className="flex flex-col items-start gap-2">
          <label className="text-stone-300 text-sm font-semibold">
            Search By Name
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded-sm outline-none"
          />
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col items-start gap-2">
            <label className="text-stone-300 text-sm font-semibold">
              Asset Type:
            </label>
            <select
              className="px-3 py-1 rounded-sm outline-none"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-Returnable</option>
            </select>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="text-stone-300 text-sm font-semibold">
              Requsted Status:
            </label>

            <select
              className="px-3 py-1 rounded-sm outline-none w-full"
              value={requestStatus}
              onChange={(e) => setRequestStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
        </div>
      </div>
      <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
        <div className="overflow-x-auto rounded-t-md">
          <table className="table rounded-t-md">
            {/* head */}
            <thead className="bg-stone-600 text-stone-100 ">
              <tr className="">
                <th>Asset Name</th>
                <th>Type</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Request Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {requestData?.map((reqData, i) => (
              <Asset key={i} reqData={reqData} refetch={refetch} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
