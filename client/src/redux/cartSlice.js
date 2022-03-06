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
        // toast.info(`Increased product quantity`, {
        //   position: "bottom-left",
        // });
      } else {
        let tempProductItem = {
          ...action.payload,
          cartQuantity: action.payload.cartQuantity,
        };
        state.cartItems.push(tempProductItem);
        // toast.success("Product added to cart", {
        //   position: "bottom-left",
        // });
      }
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        // toast.info(
        //   `Decreased ${state.cartItems[itemIndex].product.name} cart quantity successfully!`,
        //   {
        //     position: "top-right",
        //   }
        // );
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.product._id !== action.payload.product._id
        );
        state.cartItems = nextCartItems;
        // toast.error(
        //   `${action.payload.product.name} removed from cart succesfully!`,
        //   {
        //     position: "top-right",
        //   }
        // );
      }
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product._id !== action.payload.product._id
      );
      state.cartItems = nextCartItems;
      // toast.error(
      //   `${action.payload.product.name} removed from cart succesfully!`,
      //   {
      //     position: "top-right",
      //   }
      // );
    },
    clearCart(state, action) {
      state.cartItems = [];
      // toast.error(`Cart cleared!`, {
      //   position: "top-right",
      // });
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
