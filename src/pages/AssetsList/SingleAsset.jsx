import { date } from '../../utils/date';

const SingleAsset = ({ list }) => {
  //   const dataObj = new Date(list.date);
  const { formattedDate } = date(list?.date);

  //   const year = dataObj.getFullYear();
  //   const month = String(dataObj.getMonth() + 1).padStart(2, '0');
  //   const day = String(dataObj.getDate()).padStart(2, '0');

  //   const formattedDate = `${day}-${month}-${year}`;

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
      <td className=" font-josep font-semibold text-center text-stone-300  w-52">
        {list?.quantity > 0 ? list.quantity : 'Out of stock'}
      </td>
      <td className="text-stone-600 font-semibold w-40">{formattedDate}</td>
      <td className="w-44 text-center ">
        <button className="font-semibold text-sm uppercase px-3 py-1 bg-yellow-600 text-yellow-100 rounded-sm">
          Update
        </button>
      </td>

      <td className="w-44 text-center">
        <button className="font-semibold text-sm uppercase px-3 py-1 bg-red-600 text-white rounded-sm">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SingleAsset;
