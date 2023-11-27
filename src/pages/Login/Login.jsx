import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { FaFacebook, FaGithub, FaEye, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const { logIn } = useAuth();

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

  const onSubmit = async (data) => {
    console.log(data);

    if (data?.email.length === 0) return;
    if (!data?.password) return;
    logIn(data?.email, data?.password)
      .then((result) => {
        navigate('/');
      })
      .catch((err) => {
        if (err.code === 'auth/network-request-failed') {
          //  toast.err('Network request failed');
          return;
        }
        setErr('Invalid email or password. Please try again.');
      });
  };
  return (
    <div className=" lg:w-1/2 mx-auto flex flex-col items-center h-screen justify-center py-2 ">
      <h3 className="text-2xl font-bold text-stone-100 mb-4">Sign up</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full sm:p-0 px-8 sm:w-3/5 md:w-4/5 lg:w-3/5"
      >
        <div className="flex flex-col gap-1.5 -mt-3">
          <label className="text-sm text-stone-200 font-semibold">Email</label>
          <input
            className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
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
        {err ? <p className="text-red-600 text-sm">{err}</p> : ''}
        <button
          className={`bg-blue py-2 font-semibold text-lg font-josep text-stone-50 rounded-md  `}
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-blue font-semibold text-sm">
        Already registered?
        <Link to="/login" className="underline cursor-pointer ">
          Go to log in
        </Link>
      </p>
      <p className="text-blue mt-2 font-semibold text-sm">Or sign in with</p>
      <div className="my-3 flex gap-8 text-blue hover:text-darkBlue">
        <div className=" border-2 border-blue rounded-full p-1.5 cursor-pointer ">
          <FaGoogle className="text-xl" />
        </div>
        {/* <div
                onClick={google}
                className=" border-2 border-stone-700 rounded-full p-1.5"
              >
                <FaGoogle className="cursor-pointer" />
              </div> */}
        {/* <GoogleLogIn /> */}
      </div>
    </div>
  );
};

export default Login;
