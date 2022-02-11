import { useState, useContext } from "react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { UilUserCircle, UilSignOutAlt } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import MobileSideDrawer from "./MobileSideDrawer";
import { AuthContext } from "../../context/AuthContext";
import Backdrop from "../UI/Backdrop";
import { useNavigate } from "react-router-dom";
const Aside = () => {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState("none");
  const navigate = useNavigate();
  const handleOpenMobileSideDrawer = () => {
    setWidth("65%");
    setVisible("block");
  };
  const handleCloseMobileSideDrawer = () => {
    setWidth(0);
    setVisible("none");
  };
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const avatar = userData && userData.avatar.url;
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : null;
  const cartLength = cartItems && cartItems.length;
  const handleToggleSubmenu = () => {
    setIsOpen((prevstate) => !prevstate);
  };

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center">
      <SearchIcon className="w-4 h-4 mr-4 cursor-pointer hidden md:block" />
      <Link to="/cart" className="relative">
        <ShoppingCartIcon className="w-4 h-4 mr-4 cursor-pointer" />
        <span className="absolute font-bold top-[-120%] right-[0%] flex items-center justify-center">
          <span className="bg-base-color text-white text-[12px] rounded-full px-[6px] py-[1px]">
            {cartLength ? cartLength : 0}
          </span>
        </span>
      </Link>
      {!userData && (
        <Link to="/login">
          <UserIcon className="w-4 h-4 mr-4 cursor-pointer hidden md:block" />
        </Link>
      )}
      <MenuIcon
        className="w-4 h-4 cursor-pointer block md:hidden"
        onClick={handleOpenMobileSideDrawer}
      />
      {userData && (
        <div className="relative">
          <img
            src={userData && avatar}
            alt=""
            className="user-avatar"
            style={{ display: userData ? "block" : "none" }}
            onClick={handleToggleSubmenu}
          />
          {isOpen && (
            <>
              <ul className="menu-dropdown__list">
                <Link to="/user/profile">
                  <li className="menu-dropdown__item">
                    <UilUserCircle size="16" className="mr-2" />
                    <span>Profile</span>
                  </li>
                </Link>
                <Link to="/user/password-change">
                  <li className="menu-dropdown__item">
                    <span>Change password</span>
                  </li>
                </Link>
                <li className="menu-dropdown__logout" onClick={handleLogOut}>
                  <UilSignOutAlt size="16" className="mr-2" />
                  <span>Log out</span>
                </li>
              </ul>
              <Backdrop
                onClick={handleToggleSubmenu}
                className="fixed inset-0 bg-[rgba(0,0,0,0.01)] w-full h-screen z-10"
              />
            </>
          )}
        </div>
      )}

      <MobileSideDrawer
        width={width}
        handleCloseMobileSideDrawer={handleCloseMobileSideDrawer}
      />
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.75)] z-10"
        style={{ display: visible }}
        onClick={handleCloseMobileSideDrawer}
      ></div>
    </div>
  );
};
export default Aside;
