import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/outline";
import Backdrop from "../Backdrop";
import UserDropdownList from "./UserDropdownList";
// import axios from "axios";
const UserDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatar = currentUser && currentUser.user.avatar.url;
  // const userId = currentUser.user._id;
  // const [totalNoti, setTotalNoti] = useState(0);
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_API}/notification/${userId}`
  //       );
  //       const responseData = await response.data;
  //       setTotalNoti(responseData ? responseData.result : 0);
  //     } catch (err) {}
  //   };
  //   fetchNotifications();
  // }, [userId]);
  const handleToggleSubmenu = () => {
    setIsOpen((prevstate) => !prevstate);
  };
  return (
    <React.Fragment>
      {!currentUser ? (
        <Link to="/login">
          <UserIcon className="w-4 h-4 mr-4 cursor-pointer hidden md:block" />
        </Link>
      ) : (
        <div className="relative">
          <img
            src={currentUser && avatar}
            alt=""
            className="user-avatar"
            style={{ display: currentUser ? "block" : "none" }}
            onClick={handleToggleSubmenu}
          />
          {/* <span class="top-0 left-6 absolute  w-2.5 h-2.5 bg-red-600 border-1 border-white rounded-full"></span> */}
          {isOpen && (
            <React.Fragment>
              <UserDropdownList />
              <Backdrop
                onClick={handleToggleSubmenu}
                className="fixed inset-0 bg-[rgba(0,0,0,0.01)] w-full h-screen z-10"
              />
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
export default UserDropdownMenu;
