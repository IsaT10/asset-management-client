const NotFoundData = ({ children, className }) => {
  return (
    <h4
      className={`${
        className ? className : 'h-[80vh]'
      } text-lg  sm:text-xl md:text-2xl w-3/4 mx-auto text-center font-semibold text-red-600 flex flex-col items-center justify-center`}
    >
      {children}
    </h4>
  );
};

export default NotFoundData;
