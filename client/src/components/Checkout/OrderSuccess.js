import React from "react";
import WebLogo from "../../img/weblogo.png";
const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <img src={WebLogo} alt="" className="w-[50px] h-[50px] object-cover" />
      <p>Successfull</p>
      <p>Your order is being prepared. Thank for choosing Organic Shop</p>
    </div>
  );
};
export default OrderSuccess;
