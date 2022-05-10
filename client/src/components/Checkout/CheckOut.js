import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  getTotals,
  addToCart,
  decreaseCartQuantity,
} from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { UilPlus, UilMinus } from "@iconscout/react-unicons";
import CardIcon from "./credit-card.svg";
import { useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
const CheckOut = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);
  const handleCreateOrder = async () => {
    const orderItems = cart.cartItems.map((item) => {
      return {
        name: item.product.name,
        price: item.product.price,
        weight: item.product.weight,
        quantity: item.cartQuantity,
        discount: item.product.discount,
        image: item.product.images[0].url,
        product: item.product._id,
      };
    });
    const data = {
      shippingPrice: cart.cartItems.length > 0 ? 25000 : 0,
      shippingInfo: {
        name: "Nguyen Hoang Thai Hoc",
        address: "Can Ther",
        phoneNo: "0365478595",
        gender: "Nam",
      },
      totalPrice: cart.cartTotalAmount,
      orderItems: orderItems,
      paymentInfo: {
        id: " 123",
        status: "processing",
      },
    };
    const formData = new FormData();
    formData.append("shippingInfo", data.shippingInfo);
    formData.append("orderItems", data.orderItems);
    formData.append("paymentInfo", data.paymentInfo);
    formData.append("shippingPrice", data.shippingPrice);
    formData.append("totalPrice", data.totalPrice);
    formData.append("userId", user.user._id);
    axios.defaults.withCredentials = true;
    await axios.post(`${process.env.REACT_APP_BASE_API}/order/new`, {
      shippingInfo: data.shippingInfo,
      orderItems: data.orderItems,
      paymentInfo: data.paymentInfo,
      shippingPrice: data.shippingPrice,
      totalPrice: data.totalPrice,
      userId: user.user._id,
    });
  };
  const handleCheckOut = async () => {
    setIsLoading(true);
    const line_items = cart.cartItems.map((item) => {
      return {
        quantity: item.cartQuantity,
        price_data: {
          currency: "vnd",
          unit_amount: item.product.price,
          product_data: {
            name: item.product.name,
            images: [item.product.images[0].url],
          },
        },
      };
    });
    const response = await axios.post(
      `http://localhost:4000/create-checkout-session`,
      { line_items, customer_email: user.user.email }
    );
    if (response) {
      handleCreateOrder();
    }
    const responseData = await response.data.sessionId;
    const sessionId = responseData;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleIncreaseQuantity = (product) => {
    toast.success(
      `🦄 Bạn vừa tăng số lượng sản phẩm  ${product.name} trong giỏ hàng của bạn !`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    dispatch(addToCart({ product, cartQuantity: 1 }));
  };
  const handleDecreaseQuantity = (product) => {
    if (product.cartQuantity === 1) {
      toast.error(
        `🦄 Bạn vừa xóa sản phẩm  ${product.product.name} khỏi giỏ hàng của bạn !`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast.warning(
        `🦄 Bạn vừa giảm số lượng sản phẩm  ${product.product.name} trong giỏ hàng của bạn !`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }

    dispatch(decreaseCartQuantity(product));
  };
  return (
    <>
      <div className="flex sm:flex-row flex-col w-full py-[5%] px-[10%] gap-[5%]">
        <div className="w-full sm:w-[70%]">
          <Link to="/product/all">
            {" "}
            <button className="px-4 py-1 border-[2px] border-black my-6">
              Continue Shopping
            </button>
          </Link>
          {cart.cartItems &&
            cart.cartItems?.map((cartItem, index) => (
              <div key={index}>
                <div className="flex sm:flex-row flex-col md:items-center md:justify-between">
                  <div className="flex items-center">
                    <img
                      alt=" "
                      src={cartItem.product.images[0].url}
                      className="w-[80px] h-[80px] object-cover"
                    />
                    <div className="flex flex-col ml-4">
                      <div>
                        <span className="font-bold">Product : </span>
                        <span>{cartItem.product.name}</span>
                      </div>
                      <div className="sm:block hidden">
                        <span className="font-bold">Id : </span>
                        <span>{cartItem.product._id.slice(0, 8)}</span>
                      </div>
                      <div>
                        <span className="font-bold">Price : </span>
                        <span>
                          {" "}
                          {cartItem.product.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                      <div className="sm:hidden block">
                        <div className="flex items-center my-2 ">
                          <span className="font-bold">Quantity : </span>
                          <div className="ml-4 flex items-center">
                            <UilMinus
                              className="w-[16px] h-[16px] cursor-pointer"
                              onClick={() => handleDecreaseQuantity(cartItem)}
                            />
                            <span className="border-[1px] border-gray-400 w-[40px] text-center rounded mx-2">
                              {cartItem.cartQuantity}
                            </span>
                            <UilPlus
                              className="w-[16px] h-[16px] cursor-pointer"
                              onClick={() =>
                                handleIncreaseQuantity(cartItem.product)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" sm:block hidden">
                    <div className="flex items-center my-2 ">
                      <div className="ml-4 flex items-center">
                        <UilMinus
                          className="w-[16px] h-[16px] cursor-pointer"
                          onClick={() => handleDecreaseQuantity(cartItem)}
                        />
                        <span className="border-[1px] border-gray-400 w-[40px] text-center rounded mx-2">
                          {cartItem.cartQuantity}
                        </span>
                        <UilPlus
                          className="w-[16px] h-[16px] cursor-pointer"
                          onClick={() =>
                            handleIncreaseQuantity(cartItem.product)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="h-[1px] bg-slate-300 w-full my-4" />
              </div>
            ))}
          {cart.cartItems.length === 0 && (
            <div>There no product available. </div>
          )}
        </div>
        <div className="w-full sm:w-[30%] mt-2 sm:mt-14 border-[1px] border-slate-300 p-6 h-[80%]">
          <h1 className="uppercase text-2xl mb-4">Order Summary</h1>
          <div className="flex items-center justify-between mb-4">
            <span>Subtotal</span>
            <span>
              {cart.cartTotalAmount.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span>Shipping price</span>
            <span> {cart.cartItems.length > 0 ? 25000 : 0}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span>Shipping discount</span>
            <span>0 VND</span>
          </div>
          <div className="flex items-center justify-between mb-4 font-bold">
            <span>Total</span>
            <span>
              {(cart.cartTotalAmount + cart.cartItems.length > 0
                ? 25000
                : 0
              ).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <button
            // className="bg-base-color w-full py-2 text-white text-[14px]"
            onClick={handleCheckOut}
            disabled={isLoading}
            className="checkout-button"
          >
            <div className="grey-circle">
              <div className="green-circle">
                <img className="icon" src={CardIcon} alt="credit-card-icon" />
              </div>
            </div>
            <div className="text-container">
              <p className="text">{isLoading ? "Processing..." : "Buy"}</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
