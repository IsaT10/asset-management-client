import React from 'react';
import Title from '../../../../components/Title';

const AboutSection = () => {
  return (
    <>
      <Title title="About Us" />
      <div className="pb-20 md:mt-14 lg:-mt-20 mx-4">
        <p className="text-stone-400 tracking-tight">
          Welcome to AssetMaster, where we redefine asset management with a
          commitment to excellence. Our mission is to empower individuals and
          businesses to optimize their assets, drive growth, and achieve
          financial success.
        </p>

        <p className="text-stone-400 tracking-tight mt-3">
          Our Vision, at AssetMaster, we envision a world where asset management
          is seamless, intelligent, and accessible to all. We strive to be the
          catalyst for positive financial transformation by providing innovative
          solutions and expert guidance.
        </p>

        <p className="text-stone-400 tracking-tight mt-3">
          Who We Are? AssetMaster is a trusted leader in asset management,
          bringing together a team of dedicated professionals with a wealth of
          experience in finance, technology, and client services. Our collective
          expertise enables us to deliver cutting-edge solutions tailored to
          meet the unique needs of our clients.
        </p>
      </div>
    </>
  );
};

export default AboutSection;
