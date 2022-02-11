import Topbar from "./Topbar/Topbar";
const Content = (props) => {
  return (
    <div
      className="ease-linear duration-300"
      style={
        props.isActive
          ? { width: "82%", marginLeft: "18%" }
          : { width: "95%", marginLeft: "5%" }
      }
    >
      <Topbar toggleSidebar={props.toggleSidebar} isActive={props.isActive} />
      {props.children}
    </div>
  );
};
export default Content;
