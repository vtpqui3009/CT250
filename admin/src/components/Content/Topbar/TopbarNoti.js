import { useState } from "react";
import { UilBell, UilDizzyMeh } from "@iconscout/react-unicons";
import Backdrop from "../../UI/Backdrop";
const TopbarNoti = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleNoti = () => {
    setIsOpen((state) => !state);
  };
  return (
    <div className="relative">
      <div className="relative">
        <UilBell
          size="20"
          className="text-gray-500 cursor-pointer"
          onClick={handleToggleNoti}
        />
        <span className="noti-badge">
          <span>3</span>
        </span>
      </div>
      {isOpen && (
        <>
          <div className="noti-dropdown bg-[#fff]">
            <UilDizzyMeh className="text-gray-500" />
            <p className="text-[12px] text-gray-500 px-6 text-center">
              You don't have notification
            </p>
          </div>
          <Backdrop
            onClick={handleToggleNoti}
            className="fixed inset-0 bg-[rgba(0,0,0,0.01)] w-full h-screen z-10"
          />
        </>
      )}
    </div>
  );
};
export default TopbarNoti;
