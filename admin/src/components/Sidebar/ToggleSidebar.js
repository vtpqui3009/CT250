import {
  UilShutterAlt,
  UilDashboard,
  UilBox,
  UilUsersAlt,
  UilPen,
  UilInvoice,
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
            style={{ top: "15%" }}
          >
            <Link to="/">Dashboard</Link>
          </span>
        </li>
        <li className="toggle-sidebar__item group">
          <UilBox size="18" className="relative" />
          <ul className="toggle-sidebar__submenu" style={{ top: "23%" }}>
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
            style={{ top: "31%" }}
          >
            <Link to="/customer/manage">Customer</Link>
          </span>
        </li>
        <li className="toggle-sidebar__item group">
          <UilPen size="18" className="relative" />
          <ul className="toggle-sidebar__submenu" style={{ top: "39%" }}>
            <li className=" bg-siderbar-darker px-8 py-[15px]">Blog</li>
            <Link to="/blog/new">
              <li className="toggle-sidebar__link">
                <span className="ml-6">Create Blog</span>
              </li>
            </Link>
            <Link to="/blog/manage">
              <li className=" toggle-sidebar__link">
                <span className="ml-6">Manage Blog</span>
              </li>
            </Link>
          </ul>
        </li>

        <li className="toggle-sidebar__item group">
          <UilInvoice size="18" className="relative " />
          <span
            className="toggle-sidebar__submenu px-8 py-[15px]"
            style={{ top: "47%" }}
          >
            <Link to="/orders/manage">Orders</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};
export default ToogleSidebar;
