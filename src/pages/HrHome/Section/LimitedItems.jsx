import { useState } from 'react';
import useRequestData from '../../../Hooks/useRequestData';
import useAllAssets from '../../../Hooks/useAllAssets';

const LimitedItems = () => {
  const [limitedItem, setLimitedItem] = useState(true);
  const { allAssets, refetch } = useAllAssets('', '', '', '', limitedItem);
  console.log(allAssets);
  // refetch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-5 items-center">
      {allAssets?.map((item) => (
        <div
          key={item._id}
          className="bg-blue rounded-md w-[300px] mx-auto text-stone-200 gap-3  px-6 py-4 flex flex-col items-start"
        >
          <h3 className="text-xl font-semibold">{item?.productName}</h3>
          <p className="text-xs rounded-full font-semibold bg-darkBlue px-2 py-0.5 -mt-2">
            {item?.type}
          </p>
          <p>Quantity : {item?.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default LimitedItems;
