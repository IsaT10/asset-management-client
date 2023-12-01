import { Helmet } from 'react-helmet';

const HelmetTag = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetTag;
