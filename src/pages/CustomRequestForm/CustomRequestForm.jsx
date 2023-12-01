import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';
import Title from '../../components/Title';
import useHR from '../../Hooks/useHR';
import NotFoundData from '../../components/NotFoundData';
import { toast } from 'react-toastify';

const CustomRequestForm = () => {
  const { user } = useAuth();
  const { userData } = useHR();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axios = useAxios();

  const onSubmit = async (data) => {
    console.log(data);
    const { assetName, info, price, type, whyNeedThis } = data;
    const imageFile = { image: data.assetImage[0] };

    console.log(imageFile);

    const res = await axios.post(
      'https://api.imgbb.com/1/upload?key=b9e7fd7e7e867150e5dff9ee884e9359',
      imageFile,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    console.log(res.data.data.display_url);
    const imageUrl = res.data.data.display_url;
    const date = new Date();
    console.log(date);

    const requestData = {
      assetName,
      info,
      price: Number(price),
      type,
      imageUrl,
      requestDate: date,
      whyNeedThis,
      email: user?.email,
      status: 'Pending',
    };

    const { data: customData } = await axios.post(
      '/custom-request',
      requestData
    );
    reset();
    if (customData?.acknowledged) {
      toast.success('Request Send');
    }
  };
  return (
    <div className="">
      {!userData?.companyName ? (
        <NotFoundData>
          You're not yet part of a team. That's why you can not request custom
          assets.Please contact your HR for guidance and support.
        </NotFoundData>
      ) : (
        <>
          <Title title="Custom Request" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full sm:p-0 px-8 "
          >
            <div className=" grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="col-span-5 extraOutline p-4 bg-white w-full h-full row-span-2 m-auto rounded-md">
                <div className="file_upload p-5 h-full relative border-4 border-dotted border-gray-300 rounded-lg">
                  <svg
                    className="text-blue w-24  mx-auto my-14"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="input_field flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        className="text-sm cursor-pointer w-48 "
                        type="file"
                        {...register('assetImage', { required: true })}
                      />
                      {/* <div class="text bg-blue text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-darkBlue">
                    Select
                  </div> */}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-7 grid gap-8 grid-cols-2 ">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-sm text-stone-200">
                    Asset Name
                  </label>
                  <input
                    className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
                    type="text"
                    {...register('assetName', { required: true })}
                    required
                    placeholder="Type here"
                  />
                  {errors.name && (
                    <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-sm text-stone-200">
                    Price
                  </label>
                  <input
                    className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
                    type="text"
                    {...register('price', { required: true })}
                    required
                    placeholder="Type here"
                  />
                  {errors.name && (
                    <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-sm text-stone-200">
                    Asset Type
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
                  {errors.name && (
                    <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-sm text-stone-200">
                    Why you need this
                  </label>
                  <input
                    className="py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
                    type="text"
                    {...register('whyNeedThis', { required: true })}
                    required
                    placeholder="Type here"
                  />
                  {errors.name && (
                    <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 col-start-6 col-end-13">
                <label className="font-semibold text-sm text-stone-200">
                  Additional information
                </label>

                <textarea
                  className="textarea h-36 py-2 px-5 text-lg outline-none rounded-md placeholder:text-base placeholder:font-josep"
                  type="text"
                  {...register('info', { required: true })}
                  required
                  placeholder="Type here"
                ></textarea>

                {errors.name && (
                  <span className="text-red-600 font-semibold -mt-1.5 ml-px text-sm tracking-wide">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <button
              className={`bg-blue py-2 font-semibold text-lg font-josep text-stone-50 rounded-md   px-4 mt-8`}
            >
              Request
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CustomRequestForm;
