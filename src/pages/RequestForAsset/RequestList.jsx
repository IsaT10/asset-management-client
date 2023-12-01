import { useState } from 'react';
import RequestModal from './RequestModal';

const RequestList = ({ list }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <tbody>
      <tr className="border-b-2 border-stone-500">
        <td className="w-40">
          <p className="text-stone-200 font-semibold md:text-lg ">
            {list?.productName}
          </p>
        </td>
        <td className=" font-semibold w-52">
          <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
            {list?.type}
          </p>
        </td>
        <td className=" font-josep font-semibold text-center text-stone-300  w-52">
          {list?.quantity > 0 ? 'Available' : 'Out of stock'}
        </td>
        <td className="w-44 text-center">
          {list.quantity > 0 ? (
            <button
              onClick={() => setShowModal(true)}
              className={`
                        font-semibold text-sm  px-3 py-1 bg-green-600 text-white rounded-sm`}
            >
              Request
            </button>
          ) : (
            <button
              disabled
              className={`
                            opacity-20  cursor-not-allowed
                         font-semibold text-sm  px-3 py-1 bg-green-600 text-white rounded-sm`}
            >
              Request
            </button>
          )}
        </td>
      </tr>
      {showModal ? (
        <RequestModal
          list={list}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        ''
      )}
    </tbody>
  );
};

export default RequestList;
