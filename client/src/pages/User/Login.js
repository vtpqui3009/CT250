import React, { useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import LoginForm from "../../components/Auth/LoginForm";
import Footer from "../../components/Footer/Footer";
const Login = () => {
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);
  return (
    <>
      <Navigation />
      <div className="sub-heading">
        <p className="sub-heading-content">My Account</p>
      </div>

      <LoginForm />

      <Footer />
    </>
  );
};
export default Login;
