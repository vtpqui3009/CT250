import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <div className="font-playfair w-[90%] m-[5%] ">
      <h1 className="text-2xl">Cart Total</h1>
      <div className="flex flex-col lg:w-[60%] w-full mt-10">
        <div className="flex border-t border-r border-l border-gray-300">
          <div className="w-1/2 p-6  border-r border-gray-200">Subtotal</div>
          <div className="w-1/2 p-6 border-r border-gray-200">
            {cart.cartTotalAmount}
          </div>
        </div>
        <div className="flex border-[1px] border-gray-300">
          <div className="w-1/2 p-6  border-r border-gray-200">Total</div>
          <div className="w-1/2 p-6 ">{cart.cartTotalAmount}</div>
        </div>
      </div>
      <div className="cart-proceed">
        <Link to="/user/address">
          <button className="cart-proceed-button">Proceed To Checkout</button>
        </Link>
      </div>
    </div>
  );
};
export default CartTotal;
