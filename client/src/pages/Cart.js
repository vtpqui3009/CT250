import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import CartBanner from "../components/Cart/CartBanner";
import CartDesktop from "../components/Cart/CartDesktop";
import CartTotal from "../components/Cart/CartTotal";
const Cart = () => {
  return (
    <>
      <Navigation />
      <CartBanner />
      <CartDesktop />
      <CartTotal />
      <Footer />
    </>
  );
};
export default Cart;
