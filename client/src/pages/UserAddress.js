import React from "react";
import Address from "../components/User/Address";
import UserAddressBanner from "../components/User/UserAddressBanner";
import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
const UserAddress = () => {
  return (
    <React.Fragment>
      <Navigation />
      <UserAddressBanner />
      <Address />
      <Footer />
    </React.Fragment>
  );
};
export default UserAddress;
