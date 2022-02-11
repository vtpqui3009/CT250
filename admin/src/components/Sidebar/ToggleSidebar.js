import {
  UilShutterAlt,
  UilDashboard,
  UilBox,
  UilUsersAlt,
  UilHistory,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
const ToogleSidebar = () => {
  return (
    <div className="toggle-sidebar">
      <header className="toggle-sidebar__header">
        <UilShutterAlt size="22" className="text-white" />
      </header>
      <ul className="toggle-sidebar__content">
        <li className="toggle-sidebar__item group">
          <UilDashboard size="18" className="relative" />
          <span
            className="toggle-sidebar__submenu px-8 py-[15px]"
            style={{ top: "16.5%" }}
          >
            <Link to="/">Dashboard</Link>
          </span>
        </li>
        <li className="toggle-sidebar__item group">
          <UilBox size="18" className="relative" />
          <ul className="toggle-sidebar__submenu" style={{ top: "25.3%" }}>
            <li className=" bg-siderbar-darker px-8 py-[15px]">Product</li>
            <Link to="/product/new">
              <li className="toggle-sidebar__link">
                <span className="ml-6">Add Product</span>
              </li>
            </Link>
            <Link to="/product/manage">
              <li className=" toggle-sidebar__link">
                <span className="ml-6">Manage Product</span>
              </li>
            </Link>
          </ul>
        </li>
        <li className="toggle-sidebar__item group">
          <UilUsersAlt size="18" className="relative" />
          <span
            className="toggle-sidebar__submenu px-8 py-[15px]"
            style={{ top: "34%" }}
          >
            <Link to="/customer/manage">Customer</Link>
          </span>
        </li>
        <li className="toggle-sidebar__item group">
          <UilHistory size="18" className="relative" />
          <span
            className="toggle-sidebar__submenu px-8 py-[15px]"
            style={{ top: "42.8%" }}
          >
            <Link to="/history">History</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};
export default ToogleSidebar;
