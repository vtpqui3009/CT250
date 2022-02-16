import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Layout from "../../components/Layout";
const ChangePasswordSuccess = () => {
  return (
    <Layout
      chilren={
        <div className="flex items-center h-screen justify-center">
          <CheckCircleIcon className="w-6 h-6 mr-2 text-green-800" />
          <h1>Your password changed successfully. Please login again.</h1>
        </div>
      }
    />
  );
};
export default ChangePasswordSuccess;
