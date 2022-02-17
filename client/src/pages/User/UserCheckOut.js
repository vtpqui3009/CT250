import React from "react";
import CheckOut from "../../components/User/CheckOut";
import UserCheckOutBanner from "../../components/User/UserCheckOutBanner";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
const UserCheckOut = () => {
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
