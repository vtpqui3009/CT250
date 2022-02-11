const CallToAction = () => {
  return (
    <div className="w-full flex items-center h-60 mt-20 relative before:absolute before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)]">
      <div className="first-image w-1/4 h-full object-cover bg-cover"></div>
      <div className="second-image w-1/4 h-full object-cover bg-cover"></div>
      <div className="third-image w-1/4 h-full object-cover bg-cover"></div>
      <div className="fourth-image w-1/4 h-full object-cover bg-cover"></div>
      <p className="bg-base-color hover:bg-base-hover px-10 py-3 rounded-3xl cursor-pointer absolute top-[45%] left-[45%] translate-x--1/2 translate-y--1/2 text-white">
        Follow us
      </p>
    </div>
  );
};
export default CallToAction;
