import { toast } from 'react-toastify';
import useAxios from '../Hooks/useAxios';

const EmployeeCard = ({ employee, usersRefetch }) => {
  const axios = useAxios();
  const handleDelete = async () => {
    const res = await axios.patch(`/users/${employee?._id}`, {
      companyName: '',
    });

    if (res?.data?.modifiedCount) {
      toast.success('Remove Employee from team');
      usersRefetch();
    }
    console.log(res.data);
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

        <div className="flex text-stone-400 uppercase items-center mb-2 text-sm font-semibold">
          {employee?.role}
        </div>

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
