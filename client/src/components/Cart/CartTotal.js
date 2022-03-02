import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../../redux/cartSlice";
const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return cart.cartTotalAmount.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
export default CartTotal;
