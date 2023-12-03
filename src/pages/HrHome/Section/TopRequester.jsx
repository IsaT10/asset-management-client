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

  console.log(topRequester);
  return (
    <div className="flex flex-wrap gap-6 items-center justify-around pb-20">
      {sort?.map((requester) => {
        return (
          <div className="border-2 border-blue min-h-[130px] flex flex-col justify-center rounded-sm px-6 py-5 w-max text-stone-200">
            <h3 className="text-lg font-semibold ">
              <span className="font-normal text-lg">Name</span> :{' '}
              {requester?.name}
            </h3>
            <p>Total request : {requester?.requestedTime}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TopRequester;
