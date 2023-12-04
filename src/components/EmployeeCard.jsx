import { toast } from 'react-toastify';
import useAxios from '../Hooks/useAxios';
import { FaUserGear } from 'react-icons/fa6';
import { RiAdminFill } from 'react-icons/ri';
import useHR from '../Hooks/useHR';

const EmployeeCard = ({ employee, usersRefetch }) => {
  const { userData, refetch } = useHR();
  const axios = useAxios();
  const handleDelete = async () => {
    const res = await axios.patch(`/users/${employee?._id}`, {
      companyName: '',
      HR_id: userData?._id,
      members: userData?.members + 1,
      companyLogo: '',
    });

    if (res?.data?.result.modifiedCount) {
      refetch();
      toast.success('Remove Employee from team');
      usersRefetch();
    }
    // console.log(res.data);
  };
  return (
    <div className="w-[320px] sm:w-[300px] md:w-[320px]  mx-auto rounded-sm border-2 border-stone-900 overflow-hidden shadow-lg">
      <img
        className="w-full h-64 object-cover "
        src={employee?.image}
        alt="Member"
      />

      <div className="p-4">
        <div className="font-semibold text-stone-200 text-xl">
          {employee?.name}
        </div>

        <p className="flex text-stone-400 uppercase items-center mb-2 text-sm font-semibold">
          {employee?.role === 'employee' ? (
            <FaUserGear className="mr-1 text-lg" />
          ) : (
            <RiAdminFill className="mr-1 text-lg" />
          )}
          {employee?.role}
        </p>

        <button
          onClick={handleDelete}
          className="bg-red-600 mt-4 duration-150 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
