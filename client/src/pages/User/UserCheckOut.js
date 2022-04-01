import React, { useEffect } from "react";
import CheckOut from "../../components/Checkout/CheckOut";
import UserCheckOutBanner from "../../components/Checkout/UserCheckOutBanner";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";

const UserCheckOut = () => {
  useEffect(() => {
    document.title = "Checkout";
  }, []);
  return (
    <React.Fragment>
      <Navigation />
      <UserCheckOutBanner />
      <CheckOut />
      <Footer />
    </React.Fragment>
  );
};
export default UserCheckOut;
