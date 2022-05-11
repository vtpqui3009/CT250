import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Featured from "../../components/UI/Featured";
import Chart from "../../components/UI/Chart";
import { DataContext } from "../../context/DataProvider";
import { useSelector } from "react-redux";
import Modal from "../../components/UI/Modal";
const ManageOrdersTable = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [value, setValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const state = useContext(DataContext);
  const socket = state.socket;
  const [denyOrderId, setDenyOrderId] = useState(null);
  const [denyReceiverId, setDenyReceiverId] = useState(null);
  const [denyMessage, setDenyMessage] = useState("");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let maxValue = 10000000;
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/orders`
        );
        const responseData = await response.data.orders;
        const processingOrder = responseData?.filter(
          (order) => order.orderStatus === "Processing"
        );
        setAllOrders(responseData);
        const deliveredOrder = responseData?.filter(
          (order) => order.orderStatus === "Delivered"
        );

        // Get the data for charts
        if (deliveredOrder.length === 0) {
          const data = [
            {
              name: "Jan",
              Total: 0,
            },
            {
              name: "Feb",
              Total: 0,
            },
            {
              name: "Mar",
              Total: 0,
            },
            {
              name: "Apr",
              Total: 0,
            },
            {
              name: "May",
              Total: 0,
            },
            {
              name: "Jun",
              Total: 0,
            },
          ];
          setTotal(data);
        } else {
          const removeDuplicateMonth = new Set(
            deliveredOrder.map(
              (data) => new Date(data.createdAt).getMonth() + 1
            )
          );
          const month = [1, 2, 3, 4, 5, 6];
          for (let i = 0; i < month.length; i++) {
            const hasAprTotalRevenue = [...removeDuplicateMonth].includes(
              month[i]
            );
            if (hasAprTotalRevenue) {
              const totalRevenue = deliveredOrder.filter(
                (data) => new Date(data.createdAt).getMonth() + 1 === month[i]
              );
              const monthTotalItem = totalRevenue.map(
                (order) => order.totalPrice
              );
              const monthTotalRevenue = monthTotalItem.reduce((prev, next) => {
                return prev + next;
              }, 0);
              const data = [
                {
                  name: "Jan",
                  Total:
                    hasAprTotalRevenue && month[i] === 1
                      ? Math.round(monthTotalRevenue / 100)
                      : 0,
                },
                {
                  name: "Feb",
                  Total:
                    hasAprTotalRevenue && month[i] === 2
                      ? Math.round(monthTotalRevenue / 100)
                      : 0,
                },
                {
                  name: "Mar",
                  Total:
                    hasAprTotalRevenue && month[i] === 3
                      ? Math.round(monthTotalRevenue / 100)
                      : 0,
                },
                {
                  name: "Apr",
                  Total:
                    hasAprTotalRevenue && month[i] === 4
                      ? Math.round(monthTotalRevenue / 100)
                      : 0,
                },
                {
                  name: "May",
                  Total:
                    hasAprTotalRevenue && month[i] === 5
                      ? Math.round(monthTotalRevenue / 100)
                      : 0,
                },
                {
                  name: "Jun",
                  Total:
                    hasAprTotalRevenue && month[i] === 6
                      ? Math.round(monthTotalRevenue / 100)
                      : 0,
                },
              ];
              setTotal(data);
            }
          }
        }

        // Get the value, percentage for featured
        const isOrdered = deliveredOrder.filter(
          (data) =>
            new Date(data.createdAt).toLocaleDateString("vi-VI") ===
            new Date().toLocaleDateString("vi-VI")
        );

        const totalPriceArr = isOrdered.map((order) => order.totalPrice);
        const totalPrice = totalPriceArr.reduce((prev, next) => {
          return prev + next;
        }, 0);
        const relativePercentage = ((totalPrice / maxValue) * 100).toFixed(1);
        setPercentage(totalPrice ? relativePercentage : 0);
        setValue(totalPriceArr ? totalPriceArr : 0);
        setOrders(processingOrder);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleAcceptOrder = async (orderId, receiverId) => {
    try {
      const senderId = currentUser && currentUser.user._id;
      const senderName = currentUser && currentUser.user.name;
      const senderAvatar = currentUser.user.avatar.url;
      const message = `Đơn hàng với id ${orderId} của bạn đã được duyệt. Cảm ơn bạn đã tin tưởng và mua sắm tại Organic. Chúc bạn luôn vui khỏe!`;
      setIsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/order/${orderId}`,
        { status: "Delivered" }
      );
      if (response) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      }
      socket.emit("sendNotification", {
        senderId,
        senderName,
        senderAvatar,
        message,
        orderId,
        receiverId,
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const handleDenyOrder = (orderId, receiverId) => {
    setIsOpen(true);
    setDenyOrderId(orderId);
    setDenyReceiverId(receiverId);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setDenyOrderId(null);
  };
  const handleDenyMessage = (e) => {
    setDenyMessage(e.target.value);
  };
  const handleDenyFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const senderId = currentUser && currentUser.user._id;
      const senderName = currentUser && currentUser.user.name;
      const senderAvatar = currentUser.user.avatar.url;
      const message = denyMessage;
      axios.defaults.withCredentials = true;
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/order/${denyOrderId}`
      );
      if (response) {
        setOrders((order) => order._id !== denyOrderId);
        await socket.emit("sendNotification", {
          senderId,
          senderName,
          senderAvatar,
          message,
          denyOrderId,
          denyReceiverId,
        });
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isOpen && (
        <Modal
          onCloseModal={handleCloseModal}
          header="Deny Order Dialog"
          content={
            <form
              className="w-full relative text-[14px]"
              onSubmit={handleDenyFormSubmit}
            >
              <input
                placeholder="Please enter the reason why you deny this order."
                onChange={handleDenyMessage}
                className="w-full rounded border border-gray-400 outline-none focus:outline-none px-4 py-2"
              />
              <button
                type="submit"
                className="absolute right-0 border bg-sidebar-color text-white px-4 py-2"
              >
                Send
              </button>
            </form>
          }
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="text-black relative w-full h-full px-[5%] mt-20 pb-20">
          <div className="flex items-center px-[5%] h-[350px] mb-20 gap-4">
            <Featured
              value={value.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              percentage={percentage}
            />
            <Chart data={total} />
          </div>
          <div>
            <h1 className="w-[90%] ml-[5%] text-sm uppercase  font-bold my-4">
              Processing Order
            </h1>
            {orders.length > 0 ? (
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
                            <button className="table-detail__button">
                              Detail
                            </button>{" "}
                          </Link>
                        </td>
                        <td className="table-item">
                          <button
                            className="table-deny__button"
                            onClick={() =>
                              handleDenyOrder(order._id, order.user)
                            }
                          >
                            Deny
                          </button>{" "}
                        </td>
                        <td className="table-item">
                          <button
                            className="table-accept__button"
                            onClick={() =>
                              handleAcceptOrder(order._id, order.user)
                            }
                          >
                            Accept
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-sm">
                There no processing order available.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ManageOrdersTable;
