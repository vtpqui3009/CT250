const Backdrop = (props) => {
  return (
    <div onClick={props.onClick} className={props.className}>
      {props.chilren}
    </div>
  );
};
export default Backdrop;
