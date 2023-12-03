import React from 'react';

const Loader = ({ className }) => {
  return (
    <div
      className={`${
        className ? className : ' h-[50vh]'
      } text-stone-200 flex flex-col items-center justify-center`}
    >
      <span className={` loading   loading-dots loading-lg`}></span>
    </div>
  );
};

export default Loader;
