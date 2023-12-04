import { useNavigation } from 'react-router-dom';
import useHR from '../../Hooks/useHR';
import EmployeeHome from '../EmployeeHome/EmployeeHome';
import HrHome from '../HrHome/HrHome';
import AboutSection from './Section/BannerSection/AboutSection';
import Banner from './Section/BannerSection/Banner';
import PackageSection from './Section/BannerSection/PackageSection';
import Loader from '../../components/Loader';
import useAuth from '../../Hooks/useAuth';

const Home = () => {
  const { userData, isLoading } = useHR();
  // console.log(userData, 'userrrrrrrrrr');
  // console.log(isLoading);
  const { user, loading } = useAuth();

  if (isLoading && user) {
    return <Loader className="h-[80vh]" />;
  }

  if (userData?.role === 'HR') {
    return <HrHome />;
  }
  if (userData?.role === 'employee') {
    return <EmployeeHome />;
  }
  return (
    <div className="">
      <Banner />
      <PackageSection />
      <AboutSection />
    </div>
  );
};

export default Home;
