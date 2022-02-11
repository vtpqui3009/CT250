import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Feature from "./pages/Feature";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext, initialState, reducer } from "./context/AuthContext";
import UserAddress from "./pages/UserAddress";
import UserOrderSuccess from "./pages/UserOrderSuccess";
import SendEmail from "./pages/ForgotPassword/SendEmail";
import PasswordChange from "./pages/PasswordChange";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/feature/:productType" element={<Feature />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="user" element={<Outlet />}>
            <Route path="profile" element={<Profile />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="order-success" element={<UserOrderSuccess />} />
            <Route path="password" element={<Outlet />}>
              <Route path="send-email" element={<SendEmail />} />
            </Route>
            <Route path="password-change" element={<PasswordChange />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
