import { useState } from 'react';
import useHR from '../../Hooks/useHR';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';
import { toast } from 'react-toastify';
import HelmetTag from '../../components/HelmetTag';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { userData, refetch } = useHR();
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.patch(`/users/${userData._id}`, data);
    if (res?.data?.result?.modifiedCount) {
      refetch();
      toast.success('Update Profile');
      setEdit(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-85px)] flex flex-col items-center justify-center">
      <HelmetTag title={`${userData?.name} | Profile`} />
      <div className="w-3/4 lg:w-1/2  mx-auto text-stone-200">
        <div className="px-6  py-8 bg-blue rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center">
              <h3 className=" text-2xl font-semibold text-stome-900">
                My Profile
              </h3>
            </div>
            <p className="text-blue-500 hover:underline">Edit</p>
          </div>

          <div className="flex gap-20 items-start">
            <div className="flex flex-col items-center gap-5">
              <img
                className="w-28 h-28 object-cover rounded-full"
                src={userData.image}
                alt=""
              />
              {edit ? (
                <button
                  onClick={() => setEdit(false)}
                  className="bg-stone-900 text-xs rounded-sm font-semibold px-4 py-1.5"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className="bg-stone-900 text-xs rounded-sm font-semibold px-4 py-1.5"
                >
                  Edit
                </button>
              )}
            </div>

            {edit ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start gap-3 flex-1"
              >
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm font-semibold">Full Name</label>
                  <input
                    className="px-3  py-1 bg-darkBlue rounded-sm  outline-none"
                    type="text"
                    defaultValue={userData?.name}
                    {...register('name')}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm font-semibold">
                    Email{' '}
                    <span className="text-xs font-normal">
                      (Email Address cannot be changed)
                    </span>
                  </label>
                  <input
                    className="px-3 bg-darkBlue py-1 rounded-sm  outline-none"
                    type="text"
                    defaultValue={userData?.email}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm font-semibold">Date Of Birth</label>
                  <input
                    className="px-3 bg-darkBlue py-1 rounded-sm  outline-none"
                    type="date"
                    defaultValue={userData?.dateOfBirth}
                    {...register('dateOfBirth')}
                  />
                </div>
                <button className="">Save</button>
              </form>
            ) : (
              <ul className="list-none flex-1">
                <li className="mb-4">
                  <p className="font-semibold text-sm text-stone-200">
                    Full Name:
                  </p>
                  <p className=" text-stone-300">{userData?.name}</p>
                </li>

                <li className="mb-4">
                  <p className="font-semibold text-sm text-stone-200">
                    Email Address:
                  </p>
                  <p className=" text-stone-300">
                    <a href="mailto:rakiib010@gmail.com">{userData?.email}</a>
                  </p>
                </li>
                <li className="mb-4">
                  <p className="font-semibold text-sm text-stone-200">
                    Date Of Birth:
                  </p>
                  <p className=" text-stone-300">{userData?.dateOfBirth}</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
