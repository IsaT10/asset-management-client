import useRequestData from '../../Hooks/useRequestData';
import Title from '../../components/Title';

const HrHome = () => {
  const {} = useRequestData();
  return (
    <div className="min-h-screen">
      <Title title="Pending Request" />
    </div>
  );
};

export default HrHome;
