import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserCheckOut from "./pages/User/UserCheckOut";
import SendEmail from "./pages/ForgotPassword/SendEmail";
import PasswordChange from "./pages/ChangePassword/PasswordChange";
import UserProfile from "./pages/User/UserProfile";
import ProductDetail from "./pages/Product/ProductDetail";
import PasswordChangeSuccess from "./pages/ChangePassword/PasswordChangeSuccess";
import AllProduct from "./pages/Product/AllProduct";
import AllBlog from "./pages/Blog/AllBlog";
import BlogDetail from "./pages/Blog/BlogDetail";
import ProductCategoryDetail from "./pages/Product/ProductCategoryDetail";
import UserAddress from "./pages/User/UserAddress";
import Cancel from "./components/Checkout/Cancel";
import Success from "./components/Checkout/Success";
import { useSelector } from "react-redux";
import { DataProvider } from "./context/DataProvider";
import ConfirmResetToken from "./pages/ForgotPassword/ConfirmResetToken";
import UserReviewCheckout from "./pages/User/UserReviewCheckout";
import Notifications from "./pages/User/Notifications";
import MyOrder from "./pages/User/MyOrder";
import OrderDetail from "./pages/User/OrderDetail";
function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/canceled" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="user" element={<Outlet />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="checkout" element={<UserCheckOut />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="my-order" element={<MyOrder />} />
            <Route path="order/:orderId" element={<OrderDetail />} />
            <Route path="review-checkout" element={<UserReviewCheckout />} />
          </Route>
          <Route path="password" element={<Outlet />}>
            <Route path="send-email" element={<SendEmail />} />
            <Route path="reset-token" element={<ConfirmResetToken />} />
            <Route path="password-change" element={<PasswordChange />} />
            <Route
              path="password-change-sucess"
              element={<PasswordChangeSuccess />}
            />
          </Route>

          <Route path="product" element={<Outlet />}>
            <Route path="category/:type" element={<ProductCategoryDetail />} />
            <Route path=":pid" element={<ProductDetail />} />
            <Route path="all" element={<AllProduct />} />
          </Route>
          <Route path="blog" element={<Outlet />}>
            <Route path=":bid" element={<BlogDetail />} />
            <Route path="all" element={<AllBlog />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
