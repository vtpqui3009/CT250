import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserCheckOut from "./pages/User/UserCheckOut";
import UserOrderSuccess from "./pages/User/UserOrderSuccess";
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
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Cancel from "./components/Checkout/Cancel";
import Success from "./components/Checkout/Success";
import { DataProvider } from "./context/DataProvider";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log("App component was rerendered");
  return (
    <BrowserRouter>
      <ToastContainer />
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
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="user" element={<Outlet />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="address" element={<UserAddress />} />

            <Route path="checkout" element={<UserCheckOut />} />
            <Route path="order-success" element={<UserOrderSuccess />} />
            <Route path="password" element={<Outlet />}>
              <Route path="send-email" element={<SendEmail />} />
            </Route>
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
