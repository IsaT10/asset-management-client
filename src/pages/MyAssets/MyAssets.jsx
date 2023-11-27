import { useState } from 'react';
import Title from '../../components/Title';
import useRequestData from '../../Hooks/useRequestData';

const MyAssets = () => {
  const [requestStatus, setRequestStatus] = useState('all');
  const [assetType, setAssetType] = useState('all');
  const [search, setSearch] = useState('');
  const { requestData } = useRequestData(requestStatus, assetType, search);

  console.log(requestData);
  return (
    <div className="min-h-screen">
      <Title title="Assets List" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label>
        Asset Type:
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-Returnable</option>
        </select>
      </label>
      <label>
        Requsted Status:
        <select
          value={requestStatus}
          onChange={(e) => setRequestStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </label>

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
            <tbody className="">
              {/* row 1 */}

              {requestData?.map((reqData, i) => (
                <tr key={i} className="border-b-2 border-stone-200">
                  <td className="w-40">
                    <p className="text-stone-200 font-semibold md:text-lg ">
                      {reqData?.assetName}
                    </p>
                  </td>
                  <td className=" font-semibold w-52">
                    <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
                      {reqData?.type}
                    </p>
                  </td>
                  <td className=" font-josep font-semibold text-stone-200  w-52">
                    {reqData?.requestedDate}
                  </td>
                  <td className="text-stone-200 font-semibold w-40">
                    {reqData?.approvalDate ? (
                      <p>{reqData?.approvalDate}</p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="w-44">
                    <span
                      className={`${
                        reqData?.status === 'Pending'
                          ? 'font-semibold uppercase text-orange-500'
                          : 'font-semibold uppercase text-green-500'
                      }`}
                    >
                      {reqData?.status}
                    </span>
                  </td>

                  <td className="w-44 text-center">
                    {reqData?.status === 'Pending' ? (
                      <button className="font-semibold text-sm uppercase px-3 py-1 bg-red-600 text-white rounded-sm">
                        Cancel
                      </button>
                    ) : (
                      <button className="font-semibold text-sm uppercase px-3 py-1 bg-blue text-white rounded-sm">
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
