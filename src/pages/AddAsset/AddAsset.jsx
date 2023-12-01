import { useForm } from 'react-hook-form';
import Title from '../../components/Title';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';
import useHR from '../../Hooks/useHR';
import { toast } from 'react-toastify';

const AddAsset = () => {
  const { user } = useAuth();
  const { userData } = useHR();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axios = useAxios();

  const date = new Date();

  const onSubmit = async (data) => {
    console.log(data);
    const productsData = {
      productName: data.productName,
      type: data.type,
      quantity: Number(data.quantity),
      date,
      hrEmail: user?.email,
      companyName: userData?.companyName,
    };

    const res = await axios.post('/allAssets', productsData);
    if (res.data.insertedId) {
      toast.success('Asset Added');
      reset();
    }
  };
  return (
    <div className="min-h-screen">
      <div className="text-center">
        <Title title="Add an Asset" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full sm:p-0 px-8 ">
        <div className=" md:w-1/2 mx-auto flex flex-col gap-3 ">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-sm text-stone-200">
              Product Name
            </label>
            <input
              className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
              type="text"
              {...register('productName', { required: true })}
              required
              placeholder="Type here"
            />
            {errors.productName && (
              <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-sm text-stone-200">
              Products Type
            </label>

            <select
              defaultValue="null"
              className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
              {...register('type', { required: true })}
            >
              <option disabled value="null">
                Type
              </option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            {errors.type && (
              <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-sm text-stone-200">
              Product Quantity
            </label>
            <input
              className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
              type="text"
              {...register('quantity', { required: true, pattern: /^[0-9]+$/ })}
              required
              placeholder="Type here"
            />
            {errors.quantity && (
              <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                This field is required
              </span>
            )}
            {errors.quantity?.type === 'pattern' && (
              <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                This is number field
              </span>
            )}
          </div>
          <div>
            <button
              className={`bg-blue py-2 font-semibold text-lg font-josep text-stone-50 rounded-md   px-4 mt-8`}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
