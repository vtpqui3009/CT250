import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../../redux/cartSlice";
const CartTotal = ({ className }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <span className={className}>
      {cart.cartTotalAmount.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}
    </span>
  );
};
export default CartTotal;
