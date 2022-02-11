import NavbarList from "./Navbar/NavbarList";
import { XIcon } from "@heroicons/react/outline";
const MobileSideDrawer = (props) => {
  return (
    <div
      className="h-screen fixed right-0 top-0 bg-white ease-linear duration-300 z-20 block md:hidden"
      style={{ width: props.width }}
    >
      <header className="border-b border-gray-400 px-4 py-2 mb-2">
        <XIcon
          className="w-4 h-4 ml-auto "
          onClick={props.handleCloseMobileSideDrawer}
        />
      </header>
      <NavbarList />
    </div>
  );
};
export default MobileSideDrawer;
