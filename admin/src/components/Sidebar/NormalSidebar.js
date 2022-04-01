import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  UilShutterAlt,
  UilAngleRight,
  UilDashboard,
  UilBox,
  UilUsersAlt,
  UilHistory,
  UilInvoice,
  UilPen,
} from "@iconscout/react-unicons";

const NormalSidebar = (props) => {
  const [activeProductSubmenu, setActiveProductSubmenu] = useState(false);
  const [activeBlogSubmenu, setActiveBlogSubmenu] = useState(false);
  const handleOpenProductSubmenu = () => {
    setActiveProductSubmenu((state) => !state);
  };
  const handleOpenBlogSubmenu = () => {
    setActiveBlogSubmenu((state) => !state);
  };
  return (
    <>
      <header className="text-white cursor-pointer">
        <Link to="/" className="flex items-center px-6 py-4">
          <UilShutterAlt />
          <h1 className="text-center ml-4">Organic</h1>
        </Link>
      </header>
      <main className="mt-10">
        <p className="text-[10px] uppercase px-6 py-4">Menu</p>
        <ul className="text-[12.5px]">
          <NavLink to="/">
            <li className="px-6 py-4 cursor-pointer hover:text-white flex items-center">
              <UilDashboard size="16" className="mr-4" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <li
            className="cursor-pointer relative"
            onClick={handleOpenProductSubmenu}
          >
            <div className="flex items-center justify-between px-6 py-4 hover:text-white">
              <div className="flex items-center">
                <UilBox size="16" className="mr-6" />
                <span>Product</span>
              </div>
              <UilAngleRight
                size="16"
                className="ease-linear duration-200"
                style={{
                  transform: activeProductSubmenu
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            <div
              className="overflow-hidden relative ease-linear duration-300"
              style={{ height: activeProductSubmenu ? "100px" : 0 }}
            >
              <ul className="ml-2 text-[11.5px]">
                <NavLink to="/product/new">
                  <li className="px-6 py-4 hover:text-white ml-8">
                    Add product
                  </li>
                </NavLink>
                <NavLink to="/product/manage">
                  <li className="px-6 py-4 hover:text-white ml-8">
                    Manage Product{" "}
                  </li>
                </NavLink>
              </ul>
            </div>
          </li>
          <NavLink to="/customer/manage">
            <li className="px-6 py-4 cursor-pointer hover:text-white flex items-center">
              <UilUsersAlt size="16" className="mr-6" />
              <span>Customer</span>
            </li>
          </NavLink>
          {/* <NavLink to="/orders/manage">
            <li className="px-6 py-4 cursor-pointer hover:text-white flex items-center">
              <UilInvoice size="16" className="mr-6" />
              <span>Orders</span>
            </li>
          </NavLink> */}
          <li
            className="cursor-pointer relative"
            onClick={handleOpenBlogSubmenu}
          >
            <div className="flex items-center justify-between px-6 py-4 hover:text-white">
              <div className="flex items-center">
                <UilPen size="16" className="mr-6" />
                <span>Blog</span>
              </div>
              <UilAngleRight
                size="16"
                className="ease-linear duration-200"
                style={{
                  transform: activeBlogSubmenu
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            <div
              className="overflow-hidden relative ease-linear duration-300"
              style={{ height: activeBlogSubmenu ? "100px" : 0 }}
            >
              <ul className="ml-2 text-[11.5px]">
                <NavLink to="/blog/new">
                  <li className="px-6 py-4 hover:text-white ml-8">
                    Create Blog
                  </li>
                </NavLink>
                <NavLink to="/blog/manage">
                  <li className="px-6 py-4 hover:text-white ml-8">
                    Manage Blog{" "}
                  </li>
                </NavLink>
              </ul>
            </div>
          </li>
          <NavLink to="/history">
            <li className="px-6 py-4 cursor-pointer hover:text-white flex items-center">
              <UilHistory size="16" className="mr-6" />
              <span>History</span>
            </li>
          </NavLink>
        </ul>
      </main>
    </>
  );
};
export default NormalSidebar;
