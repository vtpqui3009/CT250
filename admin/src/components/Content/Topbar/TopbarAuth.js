import { useState, useContext } from "react";
import {
  UilUserCircle,
  UilWallet,
  UilSetting,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "../../UI/Backdrop";
import { AuthContext } from "../../../context/AuthContext";
const TopbarAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const avatar = userData && userData.avatar.url;

  const handleToggleSubmenu = () => {
    setIsOpen((prevstate) => !prevstate);
  };

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="relative">
      <img
        src={avatar}
        alt=""
        className="user-avatar"
        onClick={handleToggleSubmenu}
      />
      {isOpen && (
        <>
          <ul className="menu-dropdown__list">
            <Link to="/profile">
              <li className="menu-dropdown__item">
                <UilUserCircle size="16" className="mr-2" />
                <span>Profile</span>
              </li>
            </Link>
            <Link to="/wallet">
              <li className="menu-dropdown__item">
                <UilWallet size="16" className="mr-2" />
                <span>Wallet</span>
              </li>
            </Link>
            <Link to="/setting">
              <li className="menu-dropdown__item">
                <UilSetting size="16" className="mr-2" />
                <span>Setting</span>
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
  );
};
export default TopbarAuth;
