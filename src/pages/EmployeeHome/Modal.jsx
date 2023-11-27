import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import useCustomRequestData from '../../Hooks/useCustomRequestData';

const Modal = ({
  setShowModal,
  assetName,
  email,
  imageUrl,
  info,
  price,
  requestDate,
  status,
  type,
  whyNeedThis,
  _id,
}) => {
  const [editable, setEditable] = useState(false);
  const { refetch } = useCustomRequestData();
  const axios = useAxios();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const assetName = e.target.assetName.value;
    const price = e.target.price.value;
    const type = e.target.type.value;
    const info = e.target.info.value;
    const whyNeedThis = e.target.whyNeedThis.value;
    // const imageUrl = e.target.imageUrl.files[0];
    console.log({ assetName, price, type, info, whyNeedThis });
    const date = new Date();
    console.log(date);
    console.log(email);

    const imageFile = { image: e.target.imageUrl.files[0] };
    if (imageFile.image === undefined) {
      const updateData = {
        assetName,
        info,
        price: Number(price),
        type,
        imageUrl,
        requestDate: date,
        whyNeedThis,
        status,
      };
      const { data } = await axios.patch(`/custom-request/${_id}`, updateData);

      console.log(data);
      if (data.acknowledged) {
        alert('update oice');
        refetch();
        setShowModal(false);
        // toast.success(`${data.name} menu is updated`);
      }
      return;
    }
    const res = await axios.post(
      'https://api.imgbb.com/1/upload?key=b9e7fd7e7e867150e5dff9ee884e9359',
      imageFile,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    console.log(res?.data?.data?.display_url);
    const updateData = {
      assetName,
      info,
      price: Number(price),
      type,
      imageUrl: res?.data?.data?.display_url,
      requestDate: date,
      whyNeedThis,
      status: 'pending',
    };
    if (res.data.success) {
      const menuRes = await axios.patch(`/custom-request/${_id}`, updateData);

      console.log(menuRes.data);
      if (menuRes.data.acknowledged) {
        // toast.success(`${data.name} menu is updated`);
        refetch();
        setShowModal(false);
      }
    }
    console.log(res?.data);

    // const res = await axios.post(
    //   'https://api.imgbb.com/1/upload?key=b9e7fd7e7e867150e5dff9ee884e9359',
    //   imageFile,
    //   {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   }
    // );

    // console.log(res.data.data.display_url);
    // const image = res.data.data.display_url;
    // const date = new Date();
    // console.log(date);

    // const updateData = {
    //   assetName,
    //   info,
    //   price: Number(price),
    //   type,
    //   imageUrl,
    //   requestDate: date,
    //   whyNeedThis,
    //   status: 'pending',
    // };

    // const { data: customData } = await axios.post(
    //   '/custom-request',
    //   updateData
    // );

    // console.log(customData);
  };
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="modal-box min-w-[600px] mt-10 mx-auto overflow-x-hidden"
        >
          <div className="flex justify-between gap-4">
            <div className="w-2/5 flex flex-col items-start gap-2">
              {editable ? (
                <input
                  className="font-bold text-lg"
                  type="text"
                  name="assetName"
                  defaultValue={assetName}
                />
              ) : (
                <h3 className="font-bold text-lg">{assetName}</h3>
              )}
              {editable ? (
                <input
                  className="font-semibold text-stone-600"
                  type="text"
                  name="price"
                  defaultValue={price}
                />
              ) : (
                <p className="font-semibold text-stone-600">${price}</p>
              )}

              {editable ? (
                <select
                  className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold sm:font-bold text-stone-200 rounded-full"
                  type="text"
                  name="type"
                  defaultValue={type}
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              ) : (
                <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold sm:font-bold text-stone-200 rounded-full">
                  {type}
                </p>
              )}

              <p className="font-semibold text-stone-600">Request Date</p>
              <p>
                <span className="font-semibold  text-stone-600">Status :</span>{' '}
                <span
                  className={`${
                    status === 'pending'
                      ? 'font-semibold uppercase text-orange-500'
                      : 'font-semibold uppercase text-green-500'
                  }`}
                >
                  {status}
                </span>
              </p>
              {editable ? (
                <input
                  className=" text-stone-600"
                  type="text"
                  name="whyNeedThis"
                  defaultValue={whyNeedThis}
                />
              ) : (
                <p className=" text-stone-600">
                  <span className=" text-stone-600">Why Needed :</span>{' '}
                  {whyNeedThis}
                </p>
              )}
            </div>
            <div className="flex-1">
              {editable ? (
                <input type="file" name="imageUrl" />
              ) : (
                <img className="rounded-md" src={imageUrl} alt="" />
              )}
            </div>
          </div>
          {editable ? (
            <input
              className=" text-stone-600"
              type="text"
              defaultValue={info}
              name="info"
            />
          ) : (
            <p className="mt-5">{info}</p>
          )}

          <div className="flex justify-between">
            {editable ? (
              <button
                type="submit"
                className="bg-blue text-cyan-100 rounded-sm font-semibold px-4 py-2 mt-2"
              >
                Save
              </button>
            ) : (
              <span
                onClick={() => setEditable(true)}
                className="bg-blue cursor-pointer text-cyan-100 rounded-sm font-semibold px-4 py-2 mt-2"
              >
                Update
              </span>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-cyan-100 rounded-sm font-semibold px-4 py-2 mt-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
