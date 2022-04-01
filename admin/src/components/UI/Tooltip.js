const Tooltip = (props) => {
  return (
    <div
      style={props.style}
      className=" w-3/5 px-4 py-2 shadow-2xl bg-sidebar-color text-white rounded-lg "
    >
      {props.content}
    </div>
  );
};
export default Tooltip;
