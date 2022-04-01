import { useEffect } from "react";
import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import CartBanner from "../components/Cart/CartBanner";
import CartDesktop from "../components/Cart/CartDesktop";
import CartMobile from "../components/Cart/CartMobile";
const Cart = () => {
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);
  return (
    <>
      <Navigation />
      <CartBanner />
      <CartDesktop />
      <CartMobile />
      <Footer />
    </>
  );
};
export default Cart;
