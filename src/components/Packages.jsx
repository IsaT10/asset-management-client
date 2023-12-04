import { useNavigate } from 'react-router-dom';
import useAxios from '../Hooks/useAxios';
import useHR from '../Hooks/useHR';
import useAuth from '../Hooks/useAuth';

const Packages = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { userData } = useHR();
  const { user } = useAuth();

  const handlePackage = async (pack) => {
    const res = await axios.patch(`/users/${userData._id}`, {
      package: pack,
    });

    // console.log(res.data);
    navigate('/payment');
  };

  const handleStarter = () => {
    handlePackage('5 Members for $5');
  };
  const handleValuePlan = () => {
    handlePackage('10 Members for $8');
  };
  const handlePopular = () => {
    handlePackage('20 Members for $15');
  };
  return (
    <div className="container m-auto min-h-screen flex flex-col items-center justify-center max-w-7xl mx-auto px-4 lg:px-2">
      <div className="flex flex-wrap items-center justify-center w-full text-center">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 lg:order-1">
          <div className="flex flex-col rounded pb-5 border-2 border-blue-700 bg-blue-700">
            <div className="py-5 text-blue-700 bg-stone-200">
              <h3>Starter Pack</h3>
              <p className="text-5xl font-bold">$5</p>
            </div>
            <div className="p-5 flex flex-col gap-3 h-[100px] justify-center items-center  bg-blue-700 text-white rounded-b">
              <p className=" text-2xl tracking-wides font-semibold">
                5 members
              </p>
            </div>
            <div className="text-center">
              {user ? (
                <button
                  onClick={handleStarter}
                  className="px-5 py-2  uppercase rounded bg-white text-stone-950  text-sm font-semibold"
                >
                  Buy
                </button>
              ) : (
                <button
                  onClick={() => navigate('/signupAsHR')}
                  className="px-5 py-2  uppercase rounded bg-white text-stone-950  text-sm font-semibold"
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:order-2 md:w-1/2 lg:w-1/3 rounded-md p-4 mx-4 lg:mx-0 bg-darkBlue">
          <div className="flex flex-col rounded  ">
            <div className="py-5 bg-blue-700 text-white rounded-t">
              <h2 className="uppercase text-yellow-300 font-extrabold">
                Most Popular
              </h2>
              <h3>Premium Bundle</h3>
              <p className="text-5xl font-bold">$15</p>
            </div>
            <div className="p-5 flex flex-col gap-3 h-[70px] lg:h-[130px] justify-center items-center  bg-blue-700 text-white rounded-b">
              <p className=" text-2xl tracking-wides font-semibold">
                20 members
              </p>
            </div>
            <div className="text-center">
              {user ? (
                <button
                  onClick={handlePopular}
                  className="px-5 py-2  uppercase rounded bg-white text-stone-950  text-sm font-semibold"
                >
                  Buy
                </button>
              ) : (
                <button
                  onClick={() => navigate('/signupAsHR')}
                  className="px-5 py-2  uppercase rounded bg-white text-stone-950  text-sm font-semibold"
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 p-4 lg:order-3">
          <div className="flex flex-col rounded pb-5 border-2 border-blue-700 bg-blue-700">
            <div className="py-5 text-blue-700 bg-stone-200">
              <h3>Value Plan</h3>
              <p className="text-5xl font-bold">$8</p>
            </div>
            <div className="p-5 flex flex-col gap-3 h-[100px] justify-center items-center  bg-blue-700 text-white rounded-b">
              <p className=" text-2xl tracking-wides font-semibold">
                5 members
              </p>
            </div>
            <div className="text-center">
              {user ? (
                <button
                  onClick={handleValuePlan}
                  className="px-5 py-2  uppercase rounded bg-white text-stone-950  text-sm font-semibold"
                >
                  Buy
                </button>
              ) : (
                <button
                  onClick={() => navigate('/signupAsHR')}
                  className="px-5 py-2  uppercase rounded bg-white text-stone-950  text-sm font-semibold"
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default Packages;
