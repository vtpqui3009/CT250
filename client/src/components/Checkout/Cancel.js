import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Header/Navigation";
const OrderSuccess = () => {
  useEffect(() => {
    document.title = "Cancel Payment";
  }, []);
  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center flex-col mt-10 h-[50vh] px-10 sm:px-0 text-center">
        <p className="my-4 sm:my-2">Your just cancel the payment.</p>
        <Link to="/">
          <button className="px-4 py-1 border-[2px] border-black my-6">
            Back
          </button>
        </Link>
      </div>
    </>
  );
};
export default OrderSuccess;
