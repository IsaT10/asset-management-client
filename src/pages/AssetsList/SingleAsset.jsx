import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import { date } from '../../utils/date';
import { toast } from 'react-toastify';
import { useState } from 'react';

const SingleAsset = ({ list, refetch }) => {
  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState('');
  const { formattedDate } = date(list?.date);
  const axios = useAxios();
  const updatedDate = new Date();

  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete asset from database',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`/allAsset/${list?._id}`);

        if (res.data.deletedCount) {
          refetch();
          toast.error('Delete Asset Form Database');
        }
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  const handleUpdate = async () => {
    const res = await axios.patch(`/allAsset/${list?._id}`, {
      quantity: Number(quantity),
      date: updatedDate,
    });

    if (res?.data?.modifiedCount) {
      refetch();
      toast.success('Updated Product');
      setUpdate(false);
    }
    // console.log(res.data);
  };

  return (
    <tr className="border-b-2 border-stone-500">
      <td className="w-40">
        <p className="text-stone-200 font-semibold md:text-lg ">
          {list?.productName}
        </p>
      </td>
      <td className=" font-semibold w-52">
        <p className=" bg-blue text-xs px-1.5 sm:px-2 py-0.5 uppercase font-semibold  text-stone-200 rounded-full w-max">
          {list?.type}
        </p>
      </td>
      {update ? (
        <td className=" font-josep font-semibold text-center text-stone-300  w-52">
          <input
            type="number"
            className=" rounded-sm outline-none pl-3 w-16 text-stone-800 text-lg mx-auto"
            defaultValue={list?.quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </td>
      ) : (
        <td className=" font-josep font-semibold text-center text-stone-300  w-52">
          {list?.quantity > 0 ? list.quantity : 'Out of stock'}
        </td>
      )}
      <td className="text-stone-600 font-semibold w-40">{formattedDate}</td>
      <td className="w-44 text-center ">
        {update ? (
          <button
            onClick={handleUpdate}
            className="font-semibold text-sm uppercase px-6 py-1 bg-green-600 text-yellow-100 rounded-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setUpdate(true)}
            className="font-semibold text-sm uppercase px-3 py-1 bg-yellow-600 text-yellow-100 rounded-sm"
          >
            Update
          </button>
        )}
      </td>

      <td className="w-44 text-center">
        {update ? (
          <button
            onClick={() => setUpdate(false)}
            className="font-semibold text-sm uppercase px-3 py-1 bg-red-600 text-white rounded-sm"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="font-semibold text-sm uppercase px-3 py-1 bg-red-600 text-white rounded-sm"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default SingleAsset;
