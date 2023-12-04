import useHR from '../../Hooks/useHR';
import useUsers from '../../Hooks/useUsers';
import Title from '../../components/Title';
import useAllAssets from '../../Hooks/useAllAssets';
import { Link } from 'react-router-dom';
import HelmetTag from '../../components/HelmetTag';
import SingleEmpolyee from './SingleEmpolyee';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { toast } from 'react-toastify';

const AddAnEmployee = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { usersRefetch, isEmployee } = useUsers('');
  const { allAssets } = useAllAssets('', '', '', '', '');
  const { userData, refetch } = useHR();
  const axios = useAxios();

  const handleCheckChange = (id) => {
    setSelectedUsers((previousUsers) => {
      const isSelected = previousUsers.includes(id);

      if (isSelected) {
        return previousUsers.filter((i) => i !== id);
      }

      if (previousUsers.length === userData?.members) {
        toast.warning('YOu have to increse your package limit');
        return previousUsers;
      }

      return [...previousUsers, id];
    });
  };

  const handleAddTeamMembers = async () => {
    if (userData?.members === selectedUsers?.length) {
    }
    const res = await axios.patch(`/users/ids`, {
      selectedUsers,
      companyName: userData.companyName,
      HR_id: userData?._id,
      members: userData?.members - selectedUsers?.length,
      companyLogo: userData?.companyLogo,
    });

    if (res.data.result.modifiedCount) {
      usersRefetch();
      refetch();
      toast.success('Add to the team');
      setSelectedUsers([]);
    }
  };

  // console.log(userData);

  return (
    <div className="">
      <HelmetTag title="Overview " />

      <Title title="Overview" />

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
      {selectedUsers?.length ? (
        <div className="flex justify-between items-center -mt-8 mb-5">
          <h4 className="text-stone-200 text-2xl font-semibold">
            Selected {selectedUsers?.length > 1 ? 'Employees' : 'Employee'} :{' '}
            {selectedUsers?.length}
          </h4>
          <button
            onClick={handleAddTeamMembers}
            className="bg-blue text-stone-200 font-semibold uppercase px-4 py-1.5 rounded-sm"
          >
            Add To Team
          </button>
        </div>
      ) : (
        ''
      )}
      <div className="flex flex-col gap-4 text-stone-200 ">
        {isEmployee?.map((user, i) => (
          <SingleEmpolyee
            user={user}
            key={i}
            usersRefetch={usersRefetch}
            userData={userData}
            refetch={refetch}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            handleCheckChange={handleCheckChange}
          />
        ))}
      </div>
    </div>
  );
};

export default AddAnEmployee;
