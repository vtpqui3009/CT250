import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import CartBanner from "../components/Cart/CartBanner";
import CartDesktop from "../components/Cart/CartDesktop";

const Cart = () => {
  return (
    <>
      <Navigation />
      <CartBanner />
      <CartDesktop />
      <Footer />
    </>
  );
};
export default Cart;
