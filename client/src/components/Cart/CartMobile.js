import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import CartEmpty from "./CartEmpty";
import { removeItemFromCart, getTotals } from "../../redux/cartSlice";
import CartAction from "./CartAction";
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
        <table className="product-table flex items-center justify-between">
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
            {cart.cartItems?.map((cartItem) => (
              <tr className="border-b border-gray-300">
                <td className="flex items-center px-6 py-4">
                  <img
                    src={cartItem.src}
                    alt=""
                    className="mr-4 w-[100px] h-[100px]"
                  />
                  <span>{cartItem.name}</span>
                </td>
                <td className="px-6 py-4">{cartItem.weight}</td>
                <td className="px-6 py-4">
                  <input
                    value={cartItem.cartQuantity}
                    type="number"
                    className="cart-quantity"
                    onChange={handleCartQuantityChange}
                  />
                </td>
                <td className="px-6 py-4">{cartItem.price}</td>
                <td className="px-6 py-4">
                  {cartItem.cartQuantity * cartItem.price}
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
    </div>
  );
};
export default CartMobile;
