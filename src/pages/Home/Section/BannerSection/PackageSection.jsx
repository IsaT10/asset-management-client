import Packages from '../../../../components/Packages';
import Title from '../../../../components/Title';

const PackageSection = () => {
  return (
    <div>
      <Title title="Packages" />
      <div className="md:mt-14 lg:-mt-20">
        <Packages />
      </div>
    </div>
  );
};

export default PackageSection;
