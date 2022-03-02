import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import CartEmpty from "./CartEmpty";
import { removeItemFromCart, getTotals } from "../../redux/cartSlice";

const CartMobile = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeItemFromCart(cartItem));
  };
  const handleCartQuantityChange = (event) => {};
  return (
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
        <div className="flex items-center justify-center">
          <button className="border-[1px] uppercase text-gray-500 rounded-full w-full py-2 border-base-color">
            Update Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartMobile;
