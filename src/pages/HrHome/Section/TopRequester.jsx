const TopRequester = ({ requestData }) => {
  //   const topRequester = requestData?.reduce((acc, cur) => {
  //     acc[cur.name] = (acc[cur.name] || 0) + 1;

  //     return acc;
  //   }, {});

  const topRequester = requestData?.reduce((acc, cur) => {
    const existingItems = acc.find((item) => item.name === cur.name);

    if (existingItems) {
      existingItems.requestedTime += 1;
    } else {
      acc.push({ name: cur.name, requestedTime: 1 });
    }

    return acc;
  }, []);

  const sort = topRequester.sort((a, b) => {
    if (a.requestedTime > b.requestedTime) {
      return -1;
    } else if (a.requestedTime < b.requestedTime) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-5 gap-y-10 items-center ">
      {sort?.map((requester, i) => {
        return (
          <div
            key={i}
            className="bg-stone-200 rounded-md w-[300px] mx-auto text-stone-800 gap-3  px-6 py-6 flex flex-col items-start"
          >
            <h3 className="text-xl font-semibold">Rank : {i + 1}</h3>
            <h3 className="text-xl font-semibold">Name : {requester?.name}</h3>

            <p className="font-semibold">
              Total Request : {requester?.requestedTime}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TopRequester;
