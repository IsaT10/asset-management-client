import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { FaFacebook, FaGithub, FaEye, FaGoogle } from 'react-icons/fa';

const SignupForHR = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setLoading, userProfileUpdate } = useAuth();

  // const google = GoogleLogIn();
  //   const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const axios = useAxios();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  //b9e7fd7e7e867150e5dff9ee884e9359
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.companyLogo[0] };
    const profileImageFile = { image: data.image[0] };
    console.log(imageFile, profileImageFile);

    const res = await axios.post(
      'https://api.imgbb.com/1/upload?key=b9e7fd7e7e867150e5dff9ee884e9359',
      imageFile,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    const profile = await axios.post(
      'https://api.imgbb.com/1/upload?key=b9e7fd7e7e867150e5dff9ee884e9359',
      profileImageFile,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    console.log(res.data.data.display_url);
    console.log(profile.data.data.display_url);
    const imageUrl = res.data.data.display_url;
    const profileImageUrl = profile.data.data.display_url;

    createUser(data.email, data.password).then((result) => {
      userProfileUpdate(data.name, profileImageUrl)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            role: 'HR',
            image: profileImageUrl,
            companyLogo: imageUrl,
            companyName: data.companyName,
          };
          axios.post('/users', userInfo).then((res) => {
            if (res.data.acknowledged) {
              setLoading(false);
              //   toast.success('Successfully signup');
              navigate(from, { replace: true });
            }
          });
        })
        .catch((error) => {
          // console.log(error);
        });
      // toast.success('Successfully signup');
    });
  };
  return (
    <div className=" flex-1 md:w-1/2 mx-auto flex flex-col items-center justify-center py-2 ">
      <h3 className="text-2xl font-bold text-stone-100 mb-4">Signup As HR</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full sm:p-0 px-8 sm:w-3/5 md:w-4/5 lg:w-3/5"
      >
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm text-stone-200">
            Full Name
          </label>
          <input
            className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base"
            type="text"
            {...register('name', { required: true })}
            required
            placeholder="Type here"
          />
          {errors.name && (
            <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5 -mt-3">
          <label className="font-semibold text-sm text-stone-200">
            Company Name
          </label>
          <input
            className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base"
            type="text"
            {...register('companyName', { required: true })}
            required
            placeholder="Type here"
          />
          {errors.name && (
            <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5 -mt-3">
          <label className="font-semibold text-sm text-stone-200">
            Profile Picture
          </label>
          <input
            className="text-stone-200"
            type="file"
            {...register('image', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1.5 -mt-3">
          <label className="font-semibold text-sm text-stone-200">
            Company Logo
          </label>
          <input
            className="text-stone-200"
            type="file"
            {...register('companyLogo', { required: true })}
          />
        </div>
        {/* <div>
          <input type="file" {...register('image', { required: true })} />
        </div> */}
        <div className="flex flex-col gap-1.5 -mt-3">
          <label className="text-sm text-stone-200 font-semibold">Email</label>
          <input
            className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base "
            type="email"
            {...register('email', {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
            required
            placeholder="Type here"
          />
          {errors.email && (
            <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
              Please enter a valid email address
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-2 -mt-3">
          <label className="text-sm text-stone-200 font-semibold">
            Password
          </label>
          <input
            className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[A-Z])(?=.*\d).+$/,
            })}
          />
          {errors.password?.type === 'minLength' && (
            <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
              Password must has at least 6 characters
            </span>
          )}
          {errors.password?.type === 'pattern' && (
            <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
              Password at least one special character ,one digit and one
              uppercase
            </span>
          )}

          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-12 right-5 text-stone-800 cursor-pointer"
          />
        </div>
        <div className="relative flex flex-col gap-2 -mt-3">
          <label className="text-sm text-stone-200 font-semibold">
            Date of birth
          </label>
          <input
            className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base "
            type="date"
            {...register('date', {
              required: true,
            })}
          />
        </div>
        <select
          className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
          defaultValue="null"
          {...register('package', { required: true })}
        >
          <option disabled value="null">
            Packages
          </option>
          <option value="5 Members for $5">5 Members for $5</option>
          <option value="10 Members for $8">10 Members for $8</option>
          <option value="20 Members for $15">20 Members for $15</option>
        </select>
        {errors.package && (
          <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
            This field is required
          </span>
        )}
        <button
          className={`bg-blue py-2 font-semibold text-lg font-josep text-stone-50 rounded-md  `}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForHR;
