import useCustomRequestData from '../../Hooks/useCustomRequestData';
import Title from '../../components/Title';

const HrHome = () => {
  const {} = useCustomRequestData();
  return (
    <div className="min-h-screen">
      <Title title="Pending Request" />
    </div>
  );
};

export default HrHome;
