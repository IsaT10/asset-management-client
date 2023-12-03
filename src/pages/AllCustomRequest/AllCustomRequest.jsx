import useCustomRequestData from '../../Hooks/useCustomRequestData';
import HelmetTag from '../../components/HelmetTag';
import Loader from '../../components/Loader';
import NotFoundData from '../../components/NotFoundData';
import Title from '../../components/Title';
import CustomRequest from './CustomRequest';

const AllCustomRequest = () => {
  const { customRequestData, refetch, customReqLoading } =
    useCustomRequestData();
  return (
    <>
      <HelmetTag title="Custom Request By Employee" />

      <Title title="Custom Requests" />
      {customReqLoading ? (
        <Loader />
      ) : (
        <>
          {customRequestData?.length ? (
            <>
              <div className="  bg-stone-950 mx-4 md:mx-auto   min-h-screen">
                <div className="overflow-x-auto rounded-t-md">
                  <table className="table rounded-t-md">
                    {/* head */}
                    <thead className="bg-stone-600 text-stone-100 ">
                      <tr className="">
                        <th>Asset Name</th>
                        <th>Price</th>
                        <th>Asset Image</th>
                        <th>Asset Type</th>
                        <th>Necessity</th>
                        <th>Additional Info</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    {customRequestData?.map((reqData, i) => (
                      <CustomRequest
                        reqData={reqData}
                        key={i}
                        refetch={refetch}
                      />
                    ))}
                  </table>
                </div>
              </div>
            </>
          ) : (
            <NotFoundData className="h-[40vh]">No Data Available!</NotFoundData>
          )}
        </>
      )}
    </>
  );
};

export default AllCustomRequest;
