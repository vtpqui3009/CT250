import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import CartEmpty from "./CartEmpty";
import { removeItemFromCart } from "../../redux/cartSlice";
import CartAction from "./CartAction";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import React, { useState, useEffect } from "react";
import { UilPlus, UilMinus } from "@iconscout/react-unicons";
import axios from "axios";
import { addToCart, decreaseCartQuantity } from "../../redux/cartSlice";
const CartDesktop = () => {
  const [loadedAddress, setLoadedAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const cart = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserAddress = async () => {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/address/my`
      );
      const responseData = await response.data.address;
      setLoadedAddress(responseData);
    };
    fetchUserAddress();
  }, []);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeItemFromCart(cartItem));
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, cartQuantity: 1 }));
  };
  const handleDecreaseFromCart = (product) => {
    dispatch(decreaseCartQuantity(product));
  };
  const handleLoginRequire = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible((state) => !state);
  };

  const submitButton =
    loadedAddress.length === 0 ? (
      <Link to="/user/address">
        <button className="cart-proceed-button">Proceed To Checkout</button>
      </Link>
    ) : (
      <Link to="/user/checkout">
        <button className="cart-proceed-button">Proceed To Checkout</button>
      </Link>
    );
  return (
    <>
      <div className="cart-desktop">
        {cart && cart.cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <table className="product-table">
            <thead className="lg:bg-[#d2ffea]">
              <tr className="text-justify">
                <th className="cart-thead__item">Product</th>
                <th className="cart-thead__item">Weight </th>
                <th className="cart-thead__item">Quantity</th>
                <th className="cart-thead__item">Price</th>
                <th className="cart-thead__item">Total</th>
                <th className="cart-thead__item"></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.cartItems?.map((cartItem, index) => (
                  <tr className="border-b border-gray-300" key={index}>
                    <td className="flex items-center px-6 py-4">
                      <img
                        src={cartItem.product.images[0].url}
                        alt=""
                        className="mr-4 w-[100px] h-[100px]"
                      />
                      <span>{cartItem.product.name}</span>
                    </td>
                    <td className="px-6 py-4">{cartItem.product.weight}</td>
                    <td className="px-6 py-4 ">
                      <div className="flex items-center">
                        <UilPlus
                          className="w-4 h-4 text-gray-700"
                          onClick={() => handleAddToCart(cartItem.product)}
                        />
                        <span className="mx-2 px-4 rounded border-[1px] border-slate-600">
                          {cartItem.cartQuantity}
                        </span>
                        <UilMinus
                          className="w-4 h-4 text-gray-700"
                          onClick={() => handleDecreaseFromCart(cartItem)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{cartItem.product.price}</td>
                    <td className="px-6 py-4">
                      {cartItem.cartQuantity * cartItem.product.price}
                    </td>
                    <td className="px-6 py-4">
                      <XIcon
                        className="cart-discard"
                        onClick={() => {
                          handleRemoveFromCart(cartItem);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              <CartAction />
            </tbody>
          </table>
        )}
        {cart && cart.cartItems.length === 0 ? (
          <div></div>
        ) : (
          <div className="cart-proceed">
            {!userData ? (
              <React.Fragment>
                <button
                  className="cart-proceed-button"
                  onClick={handleLoginRequire}
                >
                  Proceed To Checkout
                </button>
                {modalVisible && (
                  <Modal
                    content="Please login to continue checkout."
                    onCloseModal={handleCloseModal}
                  />
                )}
              </React.Fragment>
            ) : (
              submitButton
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default CartDesktop;
