import React from "react";
import WebLogo from "../../img/weblogo.png";
const OrderSuccess = () => {
  return (
    <React.Fragment>
      <img src={WebLogo} alt="" />
      <p>Successfull</p>
      <p>Your order is being prepared. Thank for choosing Organic Shop</p>
    </React.Fragment>
  );
};
export default OrderSuccess;
