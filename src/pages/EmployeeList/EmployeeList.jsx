import useHR from '../../Hooks/useHR';
import useUsers from '../../Hooks/useUsers';
import EmployeeCard from '../../components/EmployeeCard';

const EmployeeList = () => {
  const { userData } = useHR();
  const { isEmployee, usersRefetch } = useUsers(userData?.companyName);
  const myEmployee = isEmployee.filter((user) => user.role === 'employee');
  console.log(myEmployee);
  return (
    <div className="min-h-screen">
      <h2 className="text-3xl uppercase mt-16 mb-8 font-semibold text-stone-200">
        Team Members : {myEmployee?.length}
      </h2>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {myEmployee.map((employee) => (
          <EmployeeCard
            employee={employee}
            key={employee._id}
            usersRefetch={usersRefetch}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
