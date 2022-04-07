import { useState } from "react";
import {
  UilUserCircle,
  UilWallet,
  UilSetting,
  UilSignOutAlt,
  UilKeySkeletonAlt,
} from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "../../UI/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";
const TopbarAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatar = currentUser && currentUser.user.avatar.url;
  const navigate = useNavigate();
  const handleToggleSubmenu = () => {
    setIsOpen((prevstate) => !prevstate);
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="relative">
      {currentUser ? (
        <img
          src={currentUser && avatar}
          alt=""
          className="user-avatar"
          onClick={handleToggleSubmenu}
        />
      ) : (
        <Link to="/">
          {" "}
          <button className="ml-4 text-[13px] bg-sidebar-color text-white px-4 py-1 rounded">
            Login
          </button>
        </Link>
      )}

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
            <Link to="/change-password">
              <li className="menu-dropdown__item">
                <UilKeySkeletonAlt size="16" className="mr-2" />
                <span>Change Password</span>
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
