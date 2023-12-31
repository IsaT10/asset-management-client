import { useState } from 'react';
import useAllAssets from '../../Hooks/useAllAssets';
import Title from '../../components/Title';
import RequestList from './RequestList';
import useHR from '../../Hooks/useHR';
import NotFoundData from '../../components/NotFoundData';
import HelmetTag from '../../components/HelmetTag';

const RequestForAsset = () => {
  const [stockStatus, setStockStatus] = useState('all');
  const [assetType, setAssetType] = useState('all');
  const [search, setSearch] = useState('');
  const { userData } = useHR();
  const { allAssets } = useAllAssets('', stockStatus, assetType, search, '');
  const matchedData = allAssets.filter(
    (asset) => asset.companyName === userData.companyName
  );

  return (
    <div>
      <HelmetTag title="Request for Asset " />
      {!userData?.companyName ? (
        <NotFoundData>
          You're not yet part of a team. Please contact your HR for guidance and
          support.
        </NotFoundData>
      ) : (
        <>
          {' '}
          <Title title="Assets List" />
          <div className="flex md:flex-row flex-col md:gap-1 gap-7 justify-between items-start">
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
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Available">Available</option>
                  <option value="Out-of-stock">Out of Stock</option>
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
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th className="text-center">Availability</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                {/* row 1 */}

                {matchedData?.map((list, i) => (
                  <RequestList key={i} list={list} />
                ))}
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestForAsset;
