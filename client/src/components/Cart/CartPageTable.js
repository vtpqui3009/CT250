import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import CartNotFounded from "./CartNotFounded";
import { removeItemFromCart } from "../../redux/cartSlice";
const CartPageTable = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeItemFromCart(cartItem));
  };
  const handleCartQuantityChange = (event) => {};
  return (
    <>
      <div className="cart-desktop">
        {cart.cartItems.length === 0 ? (
          <CartNotFounded />
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
              {cart.cartItems?.map((cartItem) => (
                <tr className="border-b border-gray-300">
                  <td className="flex items-center px-6 py-4">
                    <img
                      src={cartItem.src}
                      alt=""
                      width={100}
                      height={100}
                      className="mr-4"
                    />
                    <span>{cartItem.name}</span>
                  </td>
                  <td className="px-6 py-4">{cartItem.weight}</td>
                  <td className="px-6 py-4">
                    <input
                      value={cartItem.cartQuantity}
                      min={1}
                      max={10}
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
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4 ">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="cart-coupon"
                  />
                  <button className="cart-coupon__action">Apply Coupon</button>
                </td>
                <td className="cart-update">
                  <button className="cart-update__action">Update Cart</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="cart-mobile">
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
            <tr className="border-b border-gray-300 flex flex-col ">
              <td className="flexitems-center px-6 py-4 ml-auto">
                <span>Apple</span>
              </td>
              <td className="px-6 py-4 ml-auto">0.4kg</td>
              <td className="px-6 py-4 ml-auto">
                <input
                  //   value="0"
                  min={1}
                  max={10}
                  type="number"
                  className="border-[1px] border-gray-500 w-20 rounded-3xl px-4 py-2"
                />
              </td>
              <td className="px-6 py-4 ml-auto">$6.2</td>
              <td className="px-6 py-4 ml-auto">$6.2</td>
              <td className="px-6 py-4 ml-auto">
                <XIcon className=" p-1 w-5 h-5 bg-base-color rounded-full text-white hover:bg-red-600 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
        <tr className="border-b border-gray-300 flex flex-col mt-10">
          <td className="px-6 py-4 flex w-full justify-between">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-1/2 px-5 py-3 rounded-3xl border-[1px] border-gray-400 focus:border-blue-600 focus:border-[1px] text-[14px] outline-none text-center"
            />
            <button className="translate-x-4 w-1/2 px-5 py-3 rounded-3xl text-white uppercase bg-base-color hover:bg-base-hover ease-linear duration-300 text-[14px]">
              Apply Coupon
            </button>
          </td>
          <td className="px-6 py-4 w-full">
            <button className="w-full px-5 py-3 rounded-3xl text-base-color uppercase border-[1px] border-base-color hover:bg-base-hover hover:text-white ease-linear duration-300  text-[14px]">
              Update Cart
            </button>
          </td>
        </tr>
      </div>
    </>
  );
};
export default CartPageTable;
