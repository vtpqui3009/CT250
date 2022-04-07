import React, { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import Badge from "./Badge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTotal from "../Cart/CartTotal";
import Backdrop from "./Backdrop";
const CartNoti = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const handleCartVisible = () => {
    setCartVisible((prevstate) => !prevstate);
    setOpenBackdrop(true);
  };
  const handleToogleCart = () => {
    setCartVisible(false);
    setOpenBackdrop(false);
  };
  return (
    <React.Fragment>
      {openBackdrop && (
        <Backdrop
          onClick={handleToogleCart}
          className="fixed inset-0 bg-[rgba(0,0,0,0.01)] w-screen h-screen z-40"
        />
      )}
      <div className="relative">
        <ShoppingCartIcon
          className="w-4 h-4 mr-4 cursor-pointer"
          onClick={handleCartVisible}
        />
        <Badge
          number={!cart ? 0 : cart.length}
          className="absolute font-bold top-[-120%] right-[0%] flex items-center justify-center"
        />

        {cartVisible && (
          <div className="w-[50vw] sm:w-[40vw] lg:w-[20vw] absolute top-8 right-0 sm:right-[50%] shadow-lg bg-[#fff] p-2 z-40">
            {cart.length === 0 ? (
              <div className="text-center my-4 w-[60%] ml-[20%]">
                There no item on your cart. Shop now!
              </div>
            ) : (
              <React.Fragment>
                {" "}
                {cart &&
                  cart.map((item, index) => (
                    <div key={index} className="mb-2 ">
                      <div className="flex items-center gap-[4%] h-[60px]">
                        <img
                          src={item.product.images[0].url}
                          alt=""
                          className=" h-full w-[40%] object-cover"
                        />
                        <div className="w-[56%]">
                          <div className="flex items-center">
                            <span className="text-[12px] md:text-base">
                              {" "}
                              {item.product.name}
                            </span>
                            <div className="ml-1 text-[14px] flex items-center ">
                              <span className="mr-[2px]">x</span>
                              <span>{item.cartQuantity}</span>
                            </div>
                          </div>
                          <div className="text-[12px] md:text-base">
                            {item.product.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="flex items-center border-t border-gray-500 pt-2 font-bold">
                  <span className="text-[12px] md:text-base">Total : </span>
                  <div className="ml-1 text-[12px] md:text-base">
                    <CartTotal />
                  </div>
                </div>
                <Link to="/cart">
                  <button className="w-[80%] ml-[10%] bg-base-color  text-[12px] md:text-sm md:px-6 md:py-2 px-5 py-1 my-2 text-white">
                    Go To Cart
                  </button>
                </Link>
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default CartNoti;
