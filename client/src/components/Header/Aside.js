import React, { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import MobileSideDrawer from "./MobileSideDrawer";
import SearchScreen from "./SearchScreen";
import CartNoti from "../UI/CartNoti";
import UserDropdownMenu from "../UI/UserMenu/UserDropdownMenu";
import Backdrop from "../UI/Backdrop";
const Aside = () => {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState("none");
  const handleOpenMobileSideDrawer = () => {
    setWidth("75%");
    setVisible("block");
  };
  const handleCloseMobileSideDrawer = () => {
    setWidth(0);
    setVisible("none");
  };
  return (
    <React.Fragment>
      <Backdrop
        className="fixed inset-0 bg-[rgba(0,0,0,0.75)] z-10"
        style={{ display: visible }}
        onClick={handleCloseMobileSideDrawer}
      />
      <div className="flex items-center justify-center">
        <SearchScreen />
        <CartNoti />
        <UserDropdownMenu />
        <div className=" cursor-pointer block md:hidden ml-2">
          <MenuIcon className="w-4 h-4" onClick={handleOpenMobileSideDrawer} />
        </div>
        <MobileSideDrawer
          width={width}
          handleCloseMobileSideDrawer={handleCloseMobileSideDrawer}
        />
      </div>
    </React.Fragment>
  );
};
export default Aside;
