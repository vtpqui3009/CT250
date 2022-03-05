import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  getTotals,
  addToCart,
  decreaseCartQuantity,
} from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { UilPlus, UilMinus } from "@iconscout/react-unicons";
import { useStripe } from "@stripe/react-stripe-js";
const CheckOut = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const userEmail = user.user.email;
  console.log(user);
  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  const handleGuessCheckOut = async () => {
    const line_items = cart.cartItems.map((item) => {
      return {
        quantity: item.cartQuantity,
        price_data: {
          currency: "usd",
          unit_amount: item.product.price / 10000,
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [item.product.images[0].url],
          },
        },
      };
    });
    const body = { line_items, customer_email: userEmail };
    const response = await axios.post(
      `http://localhost:4000/create-checkout-session`,
      JSON.stringify(body)
    );
    const { sessionId } = response.data();
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.log(error);
    }
  };
  const handleCreateOrder = async () => {
    const productImage = cart.cartItems.map(
      (item) => item.product.images[0].url
    );
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
      shippingPrice: 25000,
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

    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/order/new`,
        JSON.stringify({
          shippingInfo: data.shippingInfo,
          orderItems: data.orderItems,
          paymentInfo: data.paymentInfo,
          shippingPrice: data.shippingPrice,
          totalPrice: data.totalPrice,
          userId: user.user._id,
        })
      );
      console.log(response);
    } catch (err) {}
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart({ product, cartQuantity: 1 }));
  };
  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseCartQuantity(product));
  };
  return (
    <>
      <div className="flex w-full py-[5%] px-[10%] gap-[5%]">
        <div className="w-[70%]">
          <Link to="/product/all">
            {" "}
            <button className="px-4 py-1 border-[2px] border-black mb-6">
              Continue Shopping
            </button>
          </Link>
          {cart.cartItems &&
            cart.cartItems?.map((cartItem, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
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
                      <div>
                        <span className="font-bold">Id : </span>
                        <span>{cartItem.product._id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
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
                    <div>
                      {cartItem.product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>
                </div>
                <hr className="h-[1px] bg-slate-300 w-full my-4" />
              </div>
            ))}
        </div>
        <div className="w-[30%] mt-14 border-[1px] border-slate-300 p-6 h-[80%]">
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
            <span> 25.000 VND</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span>Shipping discount</span>
            <span>0 VND</span>
          </div>
          <div className="flex items-center justify-between mb-4 font-bold">
            <span>Total</span>
            <span>
              {(cart.cartTotalAmount + 25000).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <button
            className="bg-base-color w-full py-2 text-white text-[14px]"
            onClick={handleCreateOrder}
          >
            CHECKOUT NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
