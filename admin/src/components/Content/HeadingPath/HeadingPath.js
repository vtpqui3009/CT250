const HeadingPath = (props) => {
  return (
    <div className="flex items-center justify-between w-[90%] ml-[5%] py-6">
      <h1 className="font-semibold">{props.heading}</h1>
      <div className="flex items-center text-[12px]">{props.chilren}</div>
    </div>
  );
};
export default HeadingPath;
