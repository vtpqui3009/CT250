import React from "react";
import OrderSuccess from "../../components/Checkout/OrderSuccess";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
const UserOrderSuccess = () => {
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
