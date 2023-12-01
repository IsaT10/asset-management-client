const RequestedItems = ({ requestData }) => {
  const mostRequested = requestData.reduce((acc, cur) => {
    const existingItem = acc.find(
      (item) => item.assetName === cur.assetName && item.type === cur.type
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ assetName: cur.assetName, quantity: 1, type: cur.type });
    }

    return acc;
  }, []);

  console.log(mostRequested);

  const sort = mostRequested.sort((a, b) => {
    // console.log(a, b);
    if (a.quantity > b.quantity) {
      return -1;
    } else if (a.quantity < b.quantity) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-5 items-center">
      {sort?.slice(0, 4).map((item, i) => (
        <div
          key={i}
          className="bg-blue rounded-md w-[300px] mx-auto text-stone-200 gap-3  px-6 py-4 flex flex-col items-start"
        >
          <h3 className="text-xl font-semibold">{item?.assetName}</h3>
          <p className="text-xs rounded-full font-semibold bg-darkBlue px-2 py-0.5 -mt-2">
            {item?.type}
          </p>
          <p className="">
            <span className="tracking-tight font-semibold text-sm">
              Requeste by Employees{' '}
            </span>
            : {item?.quantity} times
          </p>
        </div>
      ))}
    </div>
  );
};

export default RequestedItems;
