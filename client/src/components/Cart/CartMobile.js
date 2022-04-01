import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import CartEmpty from "./CartEmpty";
import { removeItemFromCart, getTotals } from "../../redux/cartSlice";
import Modal from "../UI/Modal";
import axios from "axios";
import { Link } from "react-router-dom";
const CartMobile = () => {
  const cart = useSelector((state) => state.cart);
  const [loadedAddress, setLoadedAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useSelector((state) => state.user.currentUser);
  const handleLoginRequire = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible((state) => !state);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
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
  const handleCartQuantityChange = (event) => {};
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
      {modalVisible && (
        <Modal
          content="Please login to continue checkout."
          onCloseModal={handleCloseModal}
        />
      )}
      <div className="cart-mobile">
        {cart.cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            {cart.cartItems?.map((cartItem, index) => (
              <table
                className="product-table flex items-center justify-between"
                key={index}
              >
                <thead className="w-1/2">
                  <tr className="text-justify flex flex-col">
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Weight </th>
                    <th className="px-6 py-4 font-semibold">Quantity</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="w-1/2">
                  <tr className="text-justify flex flex-col" key={index}>
                    <td className="px-6 py-4">{cartItem.product.name}</td>
                    <td className="px-6 py-4">{cartItem.product.weight}</td>
                    <td className="px-6 py-4">
                      <input
                        value={cartItem.cartQuantity}
                        type="number"
                        className="cart-quantity"
                        onChange={handleCartQuantityChange}
                      />
                    </td>
                    <td className="px-6 py-4">{cartItem.product.price}</td>
                    <td className="px-6 py-4">
                      {cartItem.product.price * cartItem.cartQuantity}
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
                </tbody>
              </table>
            ))}
          </>
        )}
        <div className="border-b border-gray-300">
          <div className="px-6 py-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Coupon Code"
              className="cart-coupon"
            />
            <button className="cart-coupon__action">Apply Coupon</button>
          </div>
          {cart.cartItems.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex items-center justify-center w-full ">
              {!userData ? (
                <div>
                  <button
                    className=" uppercase rounded-full w-full py-2 border-base-color"
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
                </div>
              ) : (
                submitButton
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CartMobile;
