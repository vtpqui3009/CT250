import { useState, useEffect } from "react";
import { UilBell, UilDizzyMeh } from "@iconscout/react-unicons";
import Backdrop from "../../UI/Backdrop";
import axios from "axios";
const TopbarNoti = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalNoti, setTotalNoti] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/orders`
        );
        const responseData = await response.data.orders;
        const processingOrder = responseData.filter(
          (order) => order.orderStatus === "Processing"
        );
        setTotalNoti(processingOrder.length);
      } catch (err) {}
    };
    fetchOrders();
  }, []);
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
          <span>{totalNoti}</span>
        </span>
      </div>
      {isOpen && (
        <>
          <div className="noti-dropdown bg-[#fff]">
            {totalNoti === 0 ? (
              <>
                <UilDizzyMeh className="text-gray-500" />
                <p className="text-[12px] text-gray-500 px-6 text-center">
                  You don't have notification
                </p>
              </>
            ) : (
              <p className="text-[12px] text-gray-500 px-6 text-center">
                You have {totalNoti} order uncheck. Check now !
              </p>
            )}
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
