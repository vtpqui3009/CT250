import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./cartSlice";
import productsReducer, { productsFetch } from "./productsSlice";
import { productsApi } from "./productsApi";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(productsFetch());
store.dispatch(getTotals());
export default store;
