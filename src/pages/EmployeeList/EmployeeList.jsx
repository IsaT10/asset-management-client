import useHR from '../../Hooks/useHR';
import useUsers from '../../Hooks/useUsers';
import EmployeeCard from '../../components/EmployeeCard';
import Title from '../../components/Title';

const EmployeeList = () => {
  const { userData } = useHR();
  console.log(userData?.companyName);
  const { isEmployee, usersRefetch } = useUsers(userData?.companyName);
  const myEmployee = isEmployee.filter((user) => user.role === 'employee');
  console.log(myEmployee);
  return (
    <div className="min-h-screen">
      <Title title="Team Members" />
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
