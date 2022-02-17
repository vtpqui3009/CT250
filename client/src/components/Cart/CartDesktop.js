import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import CartEmpty from "./CartEmpty";
import { removeItemFromCart } from "../../redux/cartSlice";
import CartAction from "./CartAction";
import { Link } from "react-router-dom";
const CartDesktop = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeItemFromCart(cartItem));
  };
  const handleCartQuantityChange = (event) => {};
  return (
    <>
      <div className="cart-desktop">
        {cart && cart.cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <table className="product-table">
            <thead className="lg:bg-[#d2ffea]">
              <tr className="text-justify">
                <th className="cart-thead__item">Product</th>
                <th className="cart-thead__item">Weight </th>
                <th className="cart-thead__item">Quantity</th>
                <th className="cart-thead__item">Price</th>
                <th className="cart-thead__item">Total</th>
                <th className="cart-thead__item"></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.cartItems?.map((cartItem, index) => (
                  <tr className="border-b border-gray-300" key={index}>
                    <td className="flex items-center px-6 py-4">
                      <img
                        src={cartItem.product.images[0].url}
                        alt=""
                        className="mr-4 w-[100px] h-[100px]"
                      />
                      <span>{cartItem.product.name}</span>
                    </td>
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
                      {cartItem.cartQuantity * cartItem.product.price}
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
        <div className="cart-proceed">
          <Link to="/user/checkout">
            <button className="cart-proceed-button">Proceed To Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default CartDesktop;
