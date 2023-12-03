import { useRef, useState } from 'react';
import useHR from '../../Hooks/useHR';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';
import { toast } from 'react-toastify';
import HelmetTag from '../../components/HelmetTag';
import { MdCancel } from 'react-icons/md';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const { userData, refetch } = useHR();
  const axios = useAxios();
  const inputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImg = () => {
    inputRef.current.click();
  };

  const handleOnChangeImg = (e) => {
    const imgFile = e.target.files[0];
    // console.log(imgFile);
    setImage(imgFile);
  };

  const onSubmit = async (data) => {
    // console.log(data);

    const imageFile = { image };
    // console.log(imageFile.image);
    if (!imageFile.image) {
      const res = await axios.patch(`/users/${userData._id}`, data);
      if (res?.data?.result?.modifiedCount) {
        refetch();
        toast.success('Update Profile');
        setEdit(false);
      }
      return;
    }

    const { data: imgUpload } = await axios.post(
      `${import.meta.env.VITE_IMGBB_URL}`,
      imageFile,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    // console.log(imgUpload.success);
    // console.log(imgUpload?.data?.display_url);

    if (imgUpload.success) {
      const res = await axios.patch(`/users/${userData._id}`, {
        ...data,
        image: imgUpload?.data?.display_url,
      });

      if (res.data.result.modifiedCount) {
        toast.success(`Update profile`);
        refetch();
        setEdit(false);
      }
    }

    // ///////////////////////////////

    // const res = await axios.patch(`/users/${userData._id}`, data);
    // if (res?.data?.result?.modifiedCount) {
    //   refetch();
    //   toast.success('Update Profile');
    //   setEdit(false);
    // }
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
            {edit ? (
              <button onClick={() => setEdit(false)}>
                <MdCancel className="text-2xl text-red-100" />
              </button>
            ) : (
              ''
            )}
          </div>

          <div className="flex gap-20 items-start">
            <div className="flex flex-col items-center gap-5">
              {edit ? (
                <>
                  <div>
                    {image ? (
                      <img
                        className="w-28 h-28 object-cover rounded-full"
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-28 h-28 object-cover rounded-full"
                        src={userData.image}
                        alt=""
                      />
                    )}

                    <input
                      type="file"
                      name=""
                      ref={inputRef}
                      onChange={handleOnChangeImg}
                      className="hidden"
                    />
                  </div>
                  <button
                    onClick={handleImg}
                    className="bg-stone-900 text-xs rounded-sm font-semibold px-4 py-1.5"
                  >
                    Upload Image
                  </button>
                </>
              ) : (
                <img
                  className="w-28 h-28 object-cover rounded-full"
                  src={userData.image}
                  alt=""
                />
              )}
              {edit ? (
                ''
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
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <p className="text-sm font-semibold"> !Required</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm font-semibold">
                    Email{' '}
                    <span className="text-xs font-normal">
                      (Email Address cannot be changed)
                    </span>
                  </label>
                  <input
                    className="px-3 bg-darkBlue py-1 text-stone-400 rounded-sm  outline-none"
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
                <button className="bg-stone-900 text-xs rounded-sm font-semibold px-4 py-1.5">
                  Save
                </button>
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
