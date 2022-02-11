import React from "react";
import OrderSuccess from "../components/User/OrderSuccess";
import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
const UserOrderSuccess = () => {
  return (
    <React.Fragment>
      <Navigation />
      <OrderSuccess />
      <Footer />
    </React.Fragment>
  );
};
export default UserOrderSuccess;
