import { useState } from 'react';
import Modal from './Modal';

const SingleItem = ({ req }) => {
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
  } = req;
  return (
    <div className="flex flex-col py-6 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-6 justify-between">
        <img
          className="flex-shrink-0 object-cover w-20 h-20  rounded outline-none sm:w-32 sm:h-32"
          src={imageUrl}
          alt=""
        />

        <div className="flex  flex-col justify-center items-center flex-1">
          <div className="flex justify-between items-center w-full pb-2 space-x-2">
            <div className="space-y-2 flex flex-col items-start justify-between">
              <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold sm:font-bold text-stone-200 rounded-full">
                {type}
              </p>
              <h3 className="sm:text-lg font-semibold leading-snug text-stone-300">
                {assetName}
              </h3>
              <p className="sm:text-lg font-semibold leading-snug text-stone-400">
                Price : ${price}
              </p>
            </div>

            <div className="flex items-center gap-14">
              <p
                className={`   py-1 uppercase font-semibold ${
                  status === 'Pending'
                    ? 'font-semibold uppercase text-xs text-orange-500'
                    : status === 'Approved'
                    ? 'font-semibold uppercase text-xs text-green-500'
                    : 'font-semibold uppercase text-xs text-red-600'
                } rounded-sm`}
              >
                {status}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-darkBlue px-4 py-2 text-white rounded-sm font-semibold"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <dialog id="_id" className="modal">
       
      </dialog> */}

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
        />
      ) : null}
    </div>
  );
};

export default SingleItem;
