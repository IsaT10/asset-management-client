import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import useHR from '../../Hooks/useHR';

const RequestModal = ({ setShowModal, list: { productName, type } }) => {
  const [note, setNote] = useState('');
  const { user } = useAuth();
  const { userData } = useHR();
  const axios = useAxios();

  const date = new Date();
  const handleNote = async () => {
    const requestedData = {
      assetName: productName,
      type,
      requestedDate: date,
      email: user?.email,
      name: user?.displayName,
      additionalInfo: note,
      status: 'Pending',
      companyName: userData?.companyName,
    };

    const { data } = await axios.post('/requestForAsset', requestedData);
    console.log(data);
    if (data.acknowledged) {
      setShowModal(false);
    }
  };
  return (
    <>
      <div className="fixed inset-0 h-[80vh]  mx-auto  flex flex-col items-center justify-center z-10 overflow-y-auto">
        <div className="relative modal-box  flex flex-col gap-4 py-14 items-center mx-auto overflow-x-hidden">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="textarea textarea-bordered w-3/4"
            placeholder="Additional Note"
          ></textarea>

          <button
            onClick={handleNote}
            className="bg-green-600 text-cyan-100 rounded-sm font-semibold px-4 py-2 mt-2"
          >
            Request
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3"
          >
            ❌
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestModal;
