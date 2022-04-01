import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import StripeCheckout from "react-stripe-checkout";
const ManageOrdersTable = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [total, setTotal] = useState(0);
  const handleGetUserEmail = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/user/${id}`
      );
      const responseData = await response.data.user.email;
      setUserEmail(responseData);
      console.log(responseData.length);
      console.log(responseData);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/orders`
        );
        const responseData = await response.data.orders;
        setOrders(responseData);
        console.log(responseData.length);
        console.log(responseData);
        // console.log(responseData._id.includ)
        console.log(responseData.map((data) => data.user));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleAcceptOrder = async (token) => {
    console.log(token);
    // console.log(amount);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/checkout`, {
        token,
        total: 100,
      });
    } catch (err) {}
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="text-black relative w-full h-full px-[10%] mt-20">
          <table className="table-content">
            <thead className="border-b border-t border-gray-300">
              <tr>
                <th className="table-item">STT</th>
                <th className="table-item">Name</th>
                <th className="table-item">Quantity</th>
                <th className="table-item">Total Price</th>
                <th className="table-item">Created At</th>
                <th className="table-item">Status</th>
                <th className="table-item">Detail</th>
                <th className="table-item">Deny</th>
                <th className="table-item">Accept</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders?.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300 text-center hover:bg-slate-200"
                  >
                    <td className="table-item">{index + 1}</td>
                    <td className="table-item">
                      {order.orderItems.map((item) => item.name)}
                    </td>
                    <td className="table-item">
                      {order.orderItems
                        .map((item) => item.quantity)
                        .reduce((prev, next) => prev + next, 0)}
                    </td>
                    <td className="table-item">
                      {order.totalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="table-item">
                      {order.createdAt.toLocaleString().slice(0, 10)}
                    </td>
                    <td className="table-item">{order.orderStatus}</td>
                    <td className="table-item">
                      <Link to={`orders/detail/${order._id}`}>
                        <button className="table-detail__button">Detail</button>{" "}
                      </Link>
                    </td>
                    <td className="table-item">
                      <button
                        className="table-deny__button"
                        onClick={props.onDenyOrder}
                      >
                        Deny
                      </button>{" "}
                    </td>
                    <td className="table-item">
                      <button
                        className="table-accept__button"
                        onClick={() => handleGetUserEmail(order.user)}
                      >
                        <StripeCheckout
                          name="Organic Shop"
                          image="https://res.cloudinary.com/datejdygy/image/upload/v1645068637/samples/weblogo_kxmm8q.png"
                          stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
                          token={handleAcceptOrder}
                          panelLabel={`Pay`}
                          currency="USD"
                          // email={userEmail && userEmail}
                          amount={order.totalPrice}
                        >
                          Accept
                        </StripeCheckout>
                      </button>{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default ManageOrdersTable;
