const Backdrop = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.chilren}
    </div>
  );
};
export default Backdrop;
