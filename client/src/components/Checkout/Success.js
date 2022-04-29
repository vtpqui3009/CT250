import React, { useEffect } from "react";
import WebLogo from "../../img/weblogo.png";
import { Link } from "react-router-dom";
import Navigation from "../Header/Navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import Confetti from "react-confetti";
const OrderSuccess = () => {
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const height = window.innerHeight;
  useEffect(() => {
    document.title = "Thank you very much!";
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center flex-col mt-10 h-[50vh] px-10 sm:px-0 text-center">
        <Confetti width={width} height={height} />
        <img src={WebLogo} alt="" className="w-[50px] h-[50px] object-cover" />
        <p className="my-4 sm:my-2">Successfull</p>
        <p className="my-4 sm:my-2">
          Your order is being prepared. Thank for choosing Organic Shop
        </p>
        <Link to="/product/all">
          <button className="px-4 py-1 border-[2px] border-black my-6">
            Continue Shopping
          </button>
        </Link>
      </div>
    </>
  );
};
export default OrderSuccess;
