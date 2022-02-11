const CartAction = () => {
  return (
    <tr className="border-b border-gray-300">
      <td className="px-6 py-4 ">
        <input type="text" placeholder="Coupon Code" className="cart-coupon" />
        <button className="cart-coupon__action">Apply Coupon</button>
      </td>
      <td className="cart-update">
        <button className="cart-update__action">Update Cart</button>
      </td>
    </tr>
  );
};
export default CartAction;
