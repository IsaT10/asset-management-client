import useHR from '../../Hooks/useHR';
import useUsers from '../../Hooks/useUsers';
import Title from '../../components/Title';
import Event from './Section/Event';
import { RiAdminFill } from 'react-icons/ri';
import { FaUserGear } from 'react-icons/fa6';
import NotFoundData from '../../components/NotFoundData';
import HelmetTag from '../../components/HelmetTag';

const MyTeam = () => {
  const { userData } = useHR();

  const { isEmployee } = useUsers(userData?.companyName);
  const allMember = isEmployee.filter(
    (user) => user.companyName === userData.companyName
  );

  const myTeamMember = allMember.filter((data) => data._id !== userData._id);

  const runningMonth = new Date().getMonth() + 1;

  const birthdayBoy = myTeamMember?.filter(
    (data) => new Date(data.dateOfBirth).getMonth() + 1 === runningMonth
  );
  //   const birthdayBoy = myTeamMember?.filter(
  //     (data) =>
  //       new Date(data.dateOfBirth).getMonth() + 1 === runningMonth &&
  //       new Date(data.dateOfBirth).getDay() + 1 - (new Date().getDay() + 1) > 0
  //   );
  return (
    <>
      <HelmetTag title="My Teammates " />
      {!userData?.companyName ? (
        <NotFoundData> You are not a member of any team yet.</NotFoundData>
      ) : (
        <div className="">
          <Title title="Upcoming Event" />
          <Event birthdayBoy={birthdayBoy} />
          <Title title="Team Member" />
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {myTeamMember.map((data, i) => (
              <div
                key={i}
                className="w-[320px] sm:w-[300px] md:w-[320px]  mx-auto rounded-sm border-2 border-stone-900 overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-64 object-cover "
                  src={data?.image}
                  alt="Member"
                />

                <div className="p-4 flex flex-col justify-between gap-4">
                  <p className="font-semibold text-stone-200 text-xl">
                    {data?.name}
                  </p>

                  <p className="flex text-stone-400 uppercase items-center mb-2 text-sm font-semibold">
                    {data?.role === 'HR' ? (
                      <RiAdminFill className="mr-1 text-lg" />
                    ) : (
                      <FaUserGear className="mr-1 text-lg" />
                    )}
                    {data?.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyTeam;
