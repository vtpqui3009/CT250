import React, { useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import { CheckCircleIcon } from "@heroicons/react/outline";
const PasswordChangeSuccess = () => {
  useEffect(() => {
    document.title = "Đổi mật khẩu thành công";
  }, []);
  return (
    <div className="h-screen w-full flex flex-col ">
      <div className="bg-green-600 text-white">
        <Navigation />
      </div>
      <main className="flex items-center justify-center mt-[8%]">
        <CheckCircleIcon className="w-6 h-6 mr-2 text-green-800" />
        <h1>Your password changed successfully. Please login again.</h1>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default PasswordChangeSuccess;
