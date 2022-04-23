import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
const ManageOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
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
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Layout
          chilren={
            <div className="w-full h-full bg-bg-color pt-[8%]">
              <HeadingPath
                heading="Manage Orders"
                chilren={
                  <>
                    <HeadingPathItem
                      pathname="Organic"
                      pathnameClass="text-gray-900"
                    />
                    <HeadingPathItem
                      pathname="Manage orders"
                      pathnameClass="text-gray-400"
                      iconClass="hidden"
                    />
                  </>
                }
              />
              <div className="text-black relative w-full h-full mt-4 pb-48">
                <table className="table-content bg-white">
                  <thead className="border-b border-t border-gray-300">
                    <tr>
                      <th className="table-item">STT</th>
                      <th className="table-item">Name</th>
                      <th className="table-item">Quantity</th>
                      <th className="table-item">Total Price</th>
                      <th className="table-item">Created At</th>
                      <th className="table-item">Status</th>
                      <th className="table-item">Detail</th>
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
                            <Link to={`/orders/detail/${order._id}`}>
                              <button className="table-detail__button">
                                View
                              </button>{" "}
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};
export default ManageOrders;
