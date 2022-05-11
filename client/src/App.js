import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { DataProvider } from "./context/DataProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));
  const Cart = React.lazy(() => import("./pages/Cart"));
  const Login = React.lazy(() => import("./pages/Login"));
  const Register = React.lazy(() => import("./pages/Register"));
  const UserCheckOut = React.lazy(() => import("./pages/User/UserCheckOut"));
  const SendEmail = React.lazy(() =>
    import("./pages/ForgotPassword/SendEmail")
  );
  const PasswordChange = React.lazy(() =>
    import("./pages/ChangePassword/PasswordChange")
  );
  const UserProfile = React.lazy(() => import("./pages/User/UserProfile"));
  const ProductDetail = React.lazy(() =>
    import("./pages/Product/ProductDetail")
  );
  const PasswordChangeSuccess = React.lazy(() =>
    import("./pages/ChangePassword/PasswordChangeSuccess")
  );
  const AllProduct = React.lazy(() => import("./pages/Product/AllProduct"));
  const AllBlog = React.lazy(() => import("./pages/Blog/AllBlog"));
  const BlogDetail = React.lazy(() => import("./pages/Blog/BlogDetail"));
  const ProductCategoryDetail = React.lazy(() =>
    import("./pages/Product/ProductCategoryDetail")
  );
  const UserAddress = React.lazy(() => import("./pages/User/UserAddress"));
  const Cancel = React.lazy(() => import("./components/Checkout/Cancel"));
  const Success = React.lazy(() => import("./components/Checkout/Success"));
  const ConfirmResetToken = React.lazy(() =>
    import("./pages/ForgotPassword/ConfirmResetToken")
  );
  const UserReviewCheckout = React.lazy(() =>
    import("./pages/User/UserReviewCheckout")
  );
  const Notifications = React.lazy(() => import("./pages/User/Notifications"));
  const MyOrder = React.lazy(() => import("./pages/User/MyOrder"));
  const OrderDetail = React.lazy(() => import("./pages/User/OrderDetail"));
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <ToastContainer />
      <DataProvider>
        <React.Suspense fallback={<span></span>}>
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
              <Route
                path="category/:type"
                element={<ProductCategoryDetail />}
              />
              <Route path=":pid" element={<ProductDetail />} />
              <Route path="all" element={<AllProduct />} />
            </Route>
            <Route path="blog" element={<Outlet />}>
              <Route path=":bid" element={<BlogDetail />} />
              <Route path="all" element={<AllBlog />} />
            </Route>
            <Route path="/" element={<Home />} />
          </Routes>
        </React.Suspense>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
