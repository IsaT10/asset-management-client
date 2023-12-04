import { useState } from 'react';
import useRequestData from '../../Hooks/useRequestData';
import Request from './Request';
import Title from '../../components/Title';
import HelmetTag from '../../components/HelmetTag';
import NotFoundData from '../../components/NotFoundData';
import Loader from '../../components/Loader';
// import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
// import useCount from '../../Hooks/useCount';
const AllRequest = () => {
  const [searchUser, setSearchUser] = useState('');
  const { requestData, refetch, reqDataLoading } = useRequestData(
    '',
    '',
    '',
    searchUser
  );
  // const { count } = useCount();
  // console.log(count);
  // const total = count.count;
  // console.log(total);
  // const totalPages = Math.ceil(total / itemPerPage);
  // console.log(totalPages);
  // const page = [...Array(totalPages || 1).keys()];

  // const firstIndex = pageNumber * itemPerPage + 1;
  // const lastIndex = Math.min((pageNumber + 1) * itemPerPage, total);
  // console.log(lastIndex, 'last');

  // console.log(page);
  // console.log(pageNumber, totalPages);

  // console.log(requestData);
  // console.log(searchUser);
  return (
    <div className="pb-10">
      <HelmetTag title="All Request By Employee" />
      <Title title="All Request" />
      <div className="flex flex-col gap-3 items-start">
        <label className="text-stone-300 text-sm font-semibold">
          Search By Employee Name & Email
        </label>
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="px-3 py-1 rounded-sm outline-none"
        />
      </div>
      {reqDataLoading ? (
        <Loader className="h-[40vh]" />
      ) : (
        <>
          {' '}
          {requestData?.length ? (
            <>
              <div className="  bg-stone-950 mx-4 md:mx-auto px-3 py-10 ">
                <div className="overflow-x-auto rounded-t-md">
                  <table className="table rounded-t-md">
                    {/* head */}
                    <thead className="bg-stone-600 text-stone-100 ">
                      <tr className="">
                        <th className="font-medium">Asset Name</th>
                        <th className="font-medium">Type</th>
                        <th className="font-medium">Name of requester</th>
                        <th className="font-medium">Email of requester</th>
                        <th className="font-medium">Additional note</th>
                        <th className="font-medium">Request Date</th>
                        <th className="font-medium">Status</th>
                        <th className="font-medium text-center">Action</th>
                        <th className="font-medium text-center">Action</th>
                      </tr>
                    </thead>
                    {requestData?.map((reqData, i) => (
                      <Request reqData={reqData} key={i} refetch={refetch} />
                    ))}
                  </table>
                  {/* <div className="flex justify-between items-center w-full rounded-b-md bg-stone-600 py-1.5 px-4">
            <p className="text-stone-200">
              Showing {firstIndex}-{lastIndex} of {total}
            </p>
            <div className="flex items-center gap-2 text-stone-200">
              <IoIosArrowBack
                onClick={() => {
                  if (pageNumber > 0) setPageNumber(pageNumber - 1);
                }}
              />
              <div className="flex">
                {page.map((p, i) => (
                  <div key={i} className="flex">
                    <span
                      onClick={() => setPageNumber(p)}
                      className={`${
                        pageNumber === p && 'bg-blue'
                      } text-white cursor-pointer border border-stone-200  px-4 py-0.5`}
                    >
                      {p + 1}
                    </span>
                  </div>
                ))}
              </div>
              <IoIosArrowForward
                onClick={() => {
                  if (pageNumber + 1 < page?.length)
                    setPageNumber(pageNumber + 1);
                }}
              />
            </div>
          </div> */}
                </div>
              </div>
            </>
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
        </>
      )}
    </div>
  );
};

export default AllRequest;
