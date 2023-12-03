import { toast } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';
import useHR from '../../Hooks/useHR';
import useUsers from '../../Hooks/useUsers';
import Title from '../../components/Title';
import useAllAssets from '../../Hooks/useAllAssets';
import { Link } from 'react-router-dom';
import HelmetTag from '../../components/HelmetTag';
import { FaUserGear } from 'react-icons/fa6';
import { RiAdminFill } from 'react-icons/ri';

const AddAnEmployee = () => {
  const { usersRefetch, isEmployee } = useUsers('');
  const { allAssets } = useAllAssets('', '', '', '', '');
  const axios = useAxios();
  const { userData, refetch } = useHR();

  // console.log(userData);

  const handleAddToTeam = async (id) => {
    const res = await axios.patch(`/users/${id}`, {
      companyName: userData.companyName,
      HR_id: userData?._id,
      members: userData?.members - 1,
      companyLogo: userData?.companyLogo,
    });

    console.log(res.data);
    if (res.data.result.matchedCount) {
      usersRefetch();
      refetch();
      toast.success('Add to the team');
    }

    // const { data } = await axios.patch(`/users/${userData._id}`, {
    //   members: userData?.members - 1,
    // });

    // console.log(data);
    // console.log(res.data);
  };
  return (
    <div className="">
      <HelmetTag title="Overview " />

      {/* <Packages /> */}
      <Title title="Overview" />
      {/* <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
        <div className="overflow-x-auto rounded-t-md">
          <table className="table rounded-t-md">
            <thead className="bg-stone-600 text-stone-100 ">
              <tr className="">
                <th>Product Name</th>
                <th>Type</th>
                <th className="">Quantity</th>
              </tr>
            </thead>
            <tbody className=" ">

              {allAssets?.map((asset, i) => (
                <tr
                  key={i}
                  className="border-b-2 border-stone-200 text-stone-200"
                >
                  <td className="">{asset?.productName}</td>
                  <td className="">{asset?.type}</td>
                  <td className=" ">{asset?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="flex flex-col items-start gap-5">
        <h3 className="text-xl font-semibold text-stone-200">
          Total Products : {allAssets.length}
        </h3>

        <div className="text-stone-200 bg-blue p-10 rounded-md flex flex-col gap-6 items-center">
          <p className=" font-semibold">Package Limit : {userData?.members}</p>
          <Link to="/packages">
            <button
              disabled={userData?.members}
              className="bg-black px-4 disabled:cursor-not-allowed disabled:opacity-40 py-1.5 rounded-sm text-xs text-white font-semibold"
            >
              Increase the limit
            </button>
          </Link>
        </div>
      </div>

      <Title title="Available Members " />

      <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
        <div className="overflow-x-auto rounded-t-md">
          <table className="table rounded-t-md">
            {/* head */}
            <thead className="bg-stone-600 text-stone-100 ">
              <tr className="">
                <th>Checkbox</th>
                <th>Image</th>
                <th className="text-center">Name</th>
                <th className="text-center">Member Type</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}

              {isEmployee?.map((user, i) => (
                <tr key={i} className="border-b-2 border-stone-200">
                  <td className="w-32">
                    <input
                      type="checkbox"
                      // checked={isChecked}
                      // onChange={() => setIsChecked(!isChecked)}
                    />
                  </td>
                  <td className=" font-semibold w-44 ">
                    <img
                      className="h-36 object-cover w-full"
                      src={user?.image}
                      alt=""
                    />
                  </td>
                  <td className=" font-semibold text-stone-200 text-center">
                    {user?.name}
                  </td>
                  <td className="text-stone-200 font-semibold  flex  justify-center mt-16">
                    <FaUserGear className="text-center" />
                  </td>

                  <td className=" text-center">
                    <button
                      onClick={() => handleAddToTeam(user?._id)}
                      disabled={!userData?.members}
                      className="disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm uppercase px-4 py-2 bg-darkBlue text-white rounded-sm"
                    >
                      Include in the team
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddAnEmployee;
