import { useState } from 'react';
import useAllAssets from '../../Hooks/useAllAssets';
import Title from '../../components/Title';
import SingleAsset from './SingleAsset';
import HelmetTag from '../../components/HelmetTag';
import NotFoundData from '../../components/NotFoundData';
import Loader from '../../components/Loader';

const AssetsList = () => {
  const [stockStatus, setStockStatus] = useState('all');
  const [assetType, setAssetType] = useState('all');
  const [search, setSearch] = useState('');
  const [asc, setAsc] = useState(true);

  const { allAssets, refetch, assetsLoading } = useAllAssets(
    asc,
    stockStatus,
    assetType,
    search,
    ''
  );

  // console.log(assetsLoading);
  // console.log(allAssets);
  // console.log(search);
  //   const updateQuery = (e) => setSearch(e?.target?.value);
  //   const debouncedOnChange = debounce(updateQuery, 300);

  return (
    <div>
      <HelmetTag title="All Assets" />
      <Title title="Assets List" />
      <button
        className="bg-blue px-4 py-1.5 rounded-sm text-stone-200 font-semibold mb-3"
        onClick={() => setAsc(!asc)}
      >
        {asc ? 'High to Low' : 'Low to High'}
      </button>

      <div className=" flex md:flex-row flex-col md:gap-1 gap-7 justify-between items-start">
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

      {allAssets?.length ? (
        <>
          <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
            <div className="overflow-x-auto rounded-t-md">
              <table className="table rounded-t-md">
                {/* head */}
                <thead className="bg-stone-600 text-stone-100 ">
                  <tr className="">
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th className="text-center">Product Quantity</th>
                    <th>Added Date</th>
                    <th className="text-center">Action</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {/* row 1 */}

                  {allAssets?.map((list, i) => (
                    <SingleAsset key={i} list={list} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {assetsLoading ? (
            <Loader />
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
        </>
      )}
    </div>
  );
};

export default AssetsList;
