import { UilSearchAlt, UilBars } from "@iconscout/react-unicons";
import TopbarNoti from "./TopbarNoti";
import TopbarAuth from "./TopbarAuth";
const Topbar = (props) => {
  return (
    <header
      className="topbar-header"
      style={{ width: props.isActive ? "82%" : "95%" }}
    >
      <div className="flex items-center">
        <UilBars
          size="20"
          className="cursor-pointer text-gray-500"
          onClick={props.toggleSidebar}
        />
        <div className="topbar-search ">
          <input type="text" placeholder="Search .." className="topbar-input" />
          <UilSearchAlt className="topbar-search__icon" />
        </div>
      </div>
      <div className="flex items-center">
        <TopbarNoti />
        <TopbarAuth />
      </div>
    </header>
  );
};
export default Topbar;
