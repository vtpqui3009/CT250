import React, { useEffect } from "react";
import OrderSuccess from "../../components/Checkout/OrderSuccess";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
const UserOrderSuccess = () => {
  useEffect(() => {
    document.title = "Đặt hàng thành công";
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <OrderSuccess />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default UserOrderSuccess;
