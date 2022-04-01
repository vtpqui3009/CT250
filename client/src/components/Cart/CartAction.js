import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
const CartAction = () => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <tr className="border-b border-gray-300">
      <td className="px-6 py-4 ">
        <input type="text" placeholder="Coupon Code" className="cart-coupon" />
        <button className="cart-coupon__action">Apply Coupon</button>
      </td>
      <td className="cart-update">
        <button className="cart-clear__action " onClick={handleClearCart}>
          Clear Cart
        </button>
      </td>
    </tr>
  );
};
export default CartAction;
