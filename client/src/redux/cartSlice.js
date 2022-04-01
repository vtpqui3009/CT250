import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      console.log(existingIndex);
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity:
            state.cartItems[existingIndex].cartQuantity +
            action.payload.cartQuantity,
        };
      } else {
        let tempProductItem = {
          ...action.payload,
          cartQuantity: action.payload.cartQuantity,
        };
        state.cartItems.push(tempProductItem);
      }
    },
    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.product._id !== action.payload.product._id
        );
        state.cartItems = nextCartItems;
      }
    },
    removeItemFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product._id !== action.payload.product._id
      );
      state.cartItems = nextCartItems;
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity } = cartItem;
          const { price } = cartItem.product;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});
export const {
  addToCart,
  decreaseCartQuantity,
  removeItemFromCart,
  clearCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
