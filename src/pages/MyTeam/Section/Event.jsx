import { date } from '../../../utils/date';

const Event = ({ birthdayBoy }) => {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {birthdayBoy.map((data, i) => {
        console.log(data);

        const remainigDay =
          new Date(data.dateOfBirth).getDate() + 1 - (new Date().getDate() + 1);
        return (
          <div
            key={i}
            className="w-[320px] sm:w-[300px] md:w-[320px]  mx-auto rounded-sm border-2 border-stone-900 overflow-hidden shadow-lg"
          >
            <img
              className="w-full h-64 object-cover "
              src={data?.image}
              alt="Member"
            />

            <div className="p-4">
              <p className="font-semibold text-stone-200 text-xl">
                {data?.name}
              </p>

              <p className="flex text-stone-400 uppercase items-center mb-2 text-sm font-semibold tracking-widest">
                {new Date(data.dateOfBirth).toLocaleDateString()}
              </p>
              {remainigDay > 0 ? (
                <div className="flex text-red-600 uppercase items-center mb-2 text-sm font-semibold tracking-tight">
                  Remaining {remainigDay > 1 ? 'days' : 'day'} {remainigDay}
                </div>
              ) : (
                <p className="text-sm tracking-tight text-stone-500">
                  The birthdate has already occurred. Heartfelt wishes for a
                  fantastic year
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Event;
