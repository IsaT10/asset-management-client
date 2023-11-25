const SingleItem = ({ req }) => {
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
              <h3 className="sm:text-lg font-semibold leading-snug text-stone-300">
                {assetName}
              </h3>
              <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold sm:font-bold text-stone-200 rounded-full">
                {type}
              </p>
            </div>

            <div className="flex gap-14">
              <p
                className={`   py-1 uppercase font-semibold ${
                  status === 'pending'
                    ? 'bg-orange-600 text-orange-100 px-3.5'
                    : 'bg-green-600 text-green-100 px-2'
                } rounded-sm`}
              >
                {status}
              </p>
              <button>Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
