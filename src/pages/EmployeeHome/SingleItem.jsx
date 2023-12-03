import { useState } from 'react';
import Modal from './Modal';

const SingleItem = ({ reqData, refetch }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    assetName,
    email,
    imageUrl,
    info,
    price,
    requestDate,
    status,
    type,
    whyNeedThis,
    _id,
  } = reqData;
  return (
    <tbody className="">
      <tr className="border-b-2 border-stone-200">
        <td className="w-20">
          <p className="text-stone-200 font-semibold  ">{reqData?.assetName}</p>
        </td>
        <td className="w-20">
          <p className="text-stone-200 font-semibold  ">${reqData?.price}</p>
        </td>
        <td className="w-20">
          <img
            className="h-20 w-24 object-cover"
            src={reqData?.imageUrl}
            alt=""
          />
        </td>
        <td className=" font-semibold text-center w-20">
          <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
            {reqData?.type}
          </p>
        </td>

        <td className="text-stone-200 font-semibold w-20">
          <span
            className={`${
              reqData?.status === 'Pending'
                ? 'font-semibold uppercase text-xs text-orange-500'
                : reqData?.status === 'Approved'
                ? 'font-semibold uppercase text-xs text-green-500'
                : 'font-semibold uppercase text-xs text-red-600'
            }`}
          >
            {reqData?.status}
          </span>
        </td>

        <td className=" text-center w-20">
          <button
            onClick={() => setShowModal(true)}
            className="font-semibold text-xs uppercase px-3 py-1.5  bg-blue text-white rounded-sm"
          >
            Details
          </button>
        </td>
      </tr>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          assetName={assetName}
          price={price}
          type={type}
          whyNeedThis={whyNeedThis}
          info={info}
          imageUrl={imageUrl}
          status={status}
          _id={_id}
          requestDate={requestDate}
        />
      ) : null}
    </tbody>
  );
};

export default SingleItem;
