import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./components/Content/Product/Product";
import AddProduct from "./pages/Product/AddProduct";
import ManageProduct from "./pages/Product/ManageProduct";
import UpdateProduct from "./pages/Product/UpdateProduct";
import ManageCustomer from "./pages/Customer/ManageCustomer";
import UserProfile from "./pages/UserProfile";
import Auth from "./components/Auth/Auth";
import Customer from "./components/Content/Customer/Customer";
import { AuthContext, initialState, reducer } from "./context/AuthContext";
import UpdateCustomer from "./pages/Customer/UpdateCustomer";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ChangePasswordSuccess from "./pages/ChangePassword/ChangePasswordSuccess";
import ManageBlog from "./pages/Blog/ManageBlog";
import NewBlog from "./pages/Blog/NewBlog";
import UpdateBlog from "./pages/Blog/UpdateBlog";
import OrderDetail from "./pages/Orders/OrderDetail";
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={!token ? <Auth /> : <Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="product" element={<Product />}>
            <Route path="new" element={<AddProduct />} />
            <Route path="manage" element={<ManageProduct />} />
            <Route path="edit/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="customer" element={<Customer />}>
            <Route path="manage" element={<ManageCustomer />} />
            <Route path="edit/:uid" element={<UpdateCustomer />} />
          </Route>
          <Route path="blog" element={<Outlet />}>
            <Route path="manage" element={<ManageBlog />} />
            <Route path="new" element={<NewBlog />} />
            <Route path=":bid" element={<h1>Blog Detail Page</h1>} />
            <Route path="edit/:bid" element={<UpdateBlog />} />
          </Route>
          <Route path="orders" element={<Outlet />}>
            <Route path="detail/:oid" element={<OrderDetail />} />
            {/* <Route path="manage" element={<ManageOrders />} /> */}
          </Route>
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/change-password-success"
            element={<ChangePasswordSuccess />}
          />
          <Route path="/history" element={<p> History Page</p>} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wallet" element={<p> Wallet Page</p>} />
          <Route path="/setting" element={<p> Setting Page</p>} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
