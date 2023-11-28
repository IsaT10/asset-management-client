import { toast } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';
import useHR from '../../Hooks/useHR';
import useUsers from '../../Hooks/useUsers';
import Title from '../../components/Title';
import useAllAssets from '../../Hooks/useAllAssets';

const AddAnEmployee = () => {
  const { usersRefetch, isEmployee } = useUsers('');
  const { allAssets } = useAllAssets('', '', '', '');
  console.log(allAssets);
  const axios = useAxios();
  const { userData } = useHR();
  const handleAddToTeam = async (id) => {
    const res = await axios.patch(`/users/${id}`, {
      companyName: userData.companyName,
    });
    if (res.data.matchedCount) {
      toast.success('Add to the team');
      usersRefetch();
    }
    console.log(res.data);
  };
  return (
    <div className="min-h-screen">
      {/* <Packages /> */}
      <Title title="Product Count Overview" />
      <div className="  bg-stone-950 mx-4 md:mx-auto px-2 py-6 md:p-10 ">
        <div className="overflow-x-auto rounded-t-md">
          <table className="table rounded-t-md">
            {/* head */}
            <thead className="bg-stone-600 text-stone-100 ">
              <tr className="">
                <th>Product Name</th>
                <th>Type</th>
                <th className="">Quantity</th>
              </tr>
            </thead>
            <tbody className=" ">
              {/* row 1 */}

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
      </div>

      <Title title="Unassigned Members " />

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
                  <td className=" font-josep font-semibold text-stone-200 text-center">
                    {user?.name}
                  </td>
                  <td className="text-stone-200 font-semibold text-center">
                    {user?.approvalDate ? <p>{user?.approvalDate}</p> : ''}
                  </td>

                  <td className=" text-center">
                    <button
                      onClick={() => handleAddToTeam(user?._id)}
                      className="font-semibold text-sm uppercase px-4 py-2 bg-darkBlue text-white rounded-sm"
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
