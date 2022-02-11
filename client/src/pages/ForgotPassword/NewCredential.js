import React from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
const NewCredential = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className="forgot-password-banner">
        <p className="sub-heading-content">New Credential</p>
      </div>
      <form></form>
      <Footer />
    </React.Fragment>
  );
};
export default NewCredential;
