import NormalSidebar from "./NormalSidebar";
import ToogleSidebar from "./ToggleSidebar";
const Sidebar = (props) => {
  return (
    <div
      className=" ease-linear duration-300 bg-sidebar-color h-screen text-gray-300 fixed inset-0"
      style={{ width: props.isActive ? "18%" : "5%" }}
    >
      <div style={{ display: props.isActive ? null : "none" }}>
        <NormalSidebar />
      </div>
      <div
        className="flex flex-col items-center"
        style={{ display: props.isActive ? "none" : "block" }}
      >
        <ToogleSidebar />
      </div>
    </div>
  );
};
export default Sidebar;
