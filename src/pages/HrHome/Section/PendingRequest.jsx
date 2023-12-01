import React from 'react';

const PendingRequest = ({ data }) => {
  return (
    <tbody className="">
      {/* row 1 */}

      <tr className="border-b-2 border-stone-200">
        <td className="w-40">
          <p className="text-stone-200 font-semibold md:text-lg ">
            {data?.assetName}
          </p>
        </td>
        <td className=" font-semibold w-52">
          <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
            {data?.type}
          </p>
        </td>
        <td className=" font-josep font-semibold text-stone-200  w-52">
          {data?.name}
        </td>
        <td className="text-stone-200 font-semibold w-40">
          <span
            className={`${
              data?.status === 'Pending'
                ? 'font-semibold uppercase text-orange-500'
                : 'font-semibold uppercase text-green-500'
            }`}
          >
            {data?.status}
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default PendingRequest;
