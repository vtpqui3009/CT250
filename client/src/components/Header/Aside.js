import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon, MenuIcon } from "@heroicons/react/outline";
import {
  UilUserCircle,
  UilSignOutAlt,
  UilKeySkeleton,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import MobileSideDrawer from "./MobileSideDrawer";
import Backdrop from "../UI/Backdrop";
import CartTotal from "../Cart/CartTotal";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import SearchScreen from "./SearchScreen";
const Aside = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState("none");
  const [cartVisible, setCartVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cartItems);
  const avatar = currentUser && currentUser.user.avatar.url;

  const handleOpenMobileSideDrawer = () => {
    setWidth("65%");
    setVisible("block");
  };
  const handleCloseMobileSideDrawer = () => {
    setWidth(0);
    setVisible("none");
  };
  const handleToggleSubmenu = () => {
    setIsOpen((prevstate) => !prevstate);
  };
  const handleLogOut = () => {
    dispatch(logout());
  };
  const handleCartVisible = () => {
    setCartVisible((prevstate) => !prevstate);
  };
  return (
    <div className="flex items-center justify-center">
      <SearchScreen />
      <div className="relative">
        <ShoppingCartIcon
          className="w-4 h-4 mr-4 cursor-pointer"
          onClick={handleCartVisible}
        />
        <span className="absolute font-bold top-[-120%] right-[0%] flex items-center justify-center">
          <span className="bg-base-color text-white text-[12px] rounded-full px-[6px] py-[1px]">
            {!cart ? 0 : cart.length}
          </span>
        </span>
        {cartVisible && (
          <div className="w-[20vw] absolute top-8 right-[50%] shadow-lg bg-[#fff] p-2 z-40">
            {!cart ? (
              <div className="text-center my-4 w-[60%] ml-[20%]">
                There no item on your cart. Shop now!
              </div>
            ) : (
              <React.Fragment>
                {" "}
                {cart &&
                  cart.map((item, index) => (
                    <div key={index} className="mb-2 ">
                      <div className="flex items-center gap-[4%] h-[60px]">
                        <img
                          src={item.product.images[0].url}
                          alt=""
                          className=" h-full w-[40%] object-cover"
                        />
                        <div className="w-[56%]">
                          <div className="flex items-center">
                            <span> {item.product.name}</span>
                            <div className="ml-1 text-[14px] flex items-center ">
                              <span className="mr-[2px]">x</span>
                              <span>{item.cartQuantity}</span>
                            </div>
                          </div>
                          <div>
                            {/* {item.product.price} */}
                            {item.product.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="flex items-center border-t border-gray-500 pt-2 font-bold">
                  <span>Total : </span>
                  <div className="ml-1">
                    <CartTotal />
                  </div>
                </div>
                <Link to="/cart">
                  <button className="w-[80%] ml-[10%] bg-base-color px-6 py-2 my-2 text-white">
                    Go To Cart
                  </button>
                </Link>
              </React.Fragment>
            )}
          </div>
        )}
      </div>

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
                    <UilKeySkeleton size="16" className="mr-2" />
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
      <div className=" cursor-pointer block md:hidden ml-2">
        <MenuIcon className="w-4 h-4" onClick={handleOpenMobileSideDrawer} />
      </div>
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
