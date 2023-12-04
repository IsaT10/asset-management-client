import { toast } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaUserGear } from 'react-icons/fa6';

const SingleEmpolyee = ({
  user,
  usersRefetch,
  refetch,
  userData,
  handleCheckChange,
  selectedUsers,
}) => {
  const axios = useAxios();

  const handleAddToTeam = async (id) => {
    const res = await axios.patch(`/users/${id}`, {
      companyName: userData.companyName,
      HR_id: userData?._id,
      members: userData?.members - 1,
      companyLogo: userData?.companyLogo,
    });

    // console.log(res.data);
    if (res.data.result.modifiedCount) {
      usersRefetch();
      refetch();
      toast.success('Add to the team');
    }
  };
  return (
    <div className="flex items-center justify-between bg-stone-800 rounded-md px-4 md:px-8 py-4">
      <input
        className="checkbox-sm md:checkbox-md"
        type="checkbox"
        checked={selectedUsers.includes(user?._id)}
        onChange={() => handleCheckChange(user?._id)}
      />
      <img
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover bg-center"
        src={user?.image}
        alt=""
      />
      <p className="font-semibold">{user?.name}</p>

      <div>
        <FaUserGear className="text-center " />
      </div>

      <button
        onClick={() => handleAddToTeam(user?._id)}
        disabled={!userData?.members}
        className="disabled:opacity-30 disabled:cursor-not-allowed uppercase px-4 py-2  text-white rounded-sm"
      >
        <IoIosAddCircleOutline className="text-3xl md:text-4xl hover:text-darkBlue duration-150 text-blue" />
      </button>
    </div>
  );
};

export default SingleEmpolyee;
