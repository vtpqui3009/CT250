import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  UilUserCircle,
  UilSignOutAlt,
  UilKeySkeleton,
  UilShoppingBag,
  UilBell,
} from "@iconscout/react-unicons";
import UserDropdownItem from "./UserDropdownItem";
import Badge from "../Badge";
import axios from "axios";
import { logout } from "../../../redux/userSlice";
const UserDropdownList = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser.user._id;
  const dispatch = useDispatch();
  const [totalNoti, setTotalNoti] = useState(0);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/notification/${userId}`
        );
        const responseData = await response.data.comments;
        const unCheckedNoti = responseData.filter(
          (noti) => noti.status === "unchecked"
        );
        setTotalNoti(unCheckedNoti ? unCheckedNoti.length : 0);
      } catch (err) {}
    };
    fetchNotifications();
  }, [userId]);
  const handleLogOut = async () => {
    dispatch(logout());
  };
  return (
    <ul className="menu-dropdown__list">
      <Link to="/user/profile">
        <UserDropdownItem
          icon={<UilUserCircle size="16" className="mr-2" />}
          text="Profile"
        />
      </Link>
      <Link to="/password/password-change">
        <UserDropdownItem
          icon={<UilKeySkeleton size="16" className="mr-2" />}
          text="Change password"
        />
      </Link>
      <Link to="/user/my-order">
        <UserDropdownItem
          icon={<UilShoppingBag size="16" className="mr-2" />}
          text="My order"
        />
      </Link>
      <Link
        to="/user/notifications"
        className="flex items-center justify-between"
      >
        <UserDropdownItem
          icon={<UilBell size="16" className="mr-2" />}
          text="Notifications"
          other={
            <Badge
              number={totalNoti}
              className="font-bold ml-10 flex items-center justify-between"
            />
          }
          otherClassName="flex items-center justify-between"
        />
      </Link>
      <UserDropdownItem
        icon={<UilSignOutAlt size="16" className="mr-2" />}
        text="Log out"
        onClick={handleLogOut}
      />
    </ul>
  );
};
export default UserDropdownList;
