import { useState } from 'react';
import useAllAssets from '../../Hooks/useAllAssets';
import Title from '../../components/Title';
import RequestList from './RequestList';

const RequestForAsset = () => {
  const [stockStatus, setStockStatus] = useState('all');
  const [assetType, setAssetType] = useState('all');
  const [search, setSearch] = useState('');

  const { allAssets } = useAllAssets('', stockStatus, assetType, search);
  console.log(allAssets);
  console.log(search);

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
        Stock Status:
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Out-of-stock">Out of Stock</option>
        </select>
      </label>

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
            <tbody className="">
              {/* row 1 */}

              {allAssets?.map((list, i) => (
                <RequestList key={i} list={list} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestForAsset;
