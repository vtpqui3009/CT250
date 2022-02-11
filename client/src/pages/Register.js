import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
const Register = () => {
  return (
    <>
      <Navigation />
      <div className="sub-heading">
        <p className="sub-heading-content">My Account</p>
      </div>

      <RegisterForm />

      <Footer />
    </>
  );
};
export default Register;
