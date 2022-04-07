import axios from "axios";
import React, { useState, useEffect } from "react";
import TimelineOrderItem from "./TimelineOrderItem";
import LoadingSpinner from "../LoadingSpinner";
import moment from "moment";

const TimelineOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [groupOrders, setGroupOrders] = useState([]);
  useEffect(() => {
    document.title = "Đơn hàng của tôi";
    const fetchMyOrders = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/orders/me`
        );
        const responseData = await response.data.orders;

        // const groupDate = responseData.map((data) =>
        //   moment(data.createdAt).format("MMMM Do YYYY")
        // );
        // const removeDuplicate = [...new Set(groupDate)];
        // let data = [];
        // for (let i = 0; i < removeDuplicate.length; i++) {
        //   const newArr = responseData.filter((data) =>
        //     removeDuplicate[i].includes(
        //       moment(data.createdAt).format("MMMM Do YYYY")
        //     )
        //   );
        //   data.push(newArr);
        //   console.log(data);
        // }
        // setGroupOrders(data);

        setMyOrders(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchMyOrders();
  }, []);
  // console.log(groupOrders);
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <h1 className="uppercase text-xl my-4 font-bold">My orders</h1>
          <ol className="relative w-[90%]">
            {myOrders &&
              myOrders?.map((order) =>
                order.orderItems.map((item) => (
                  <TimelineOrderItem
                    orderId={order._id}
                    key={item._id}
                    timelineTime={moment(order.createdAt).format(
                      "MMMM Do YYYY"
                    )}
                    timelineImage={item.image}
                    timelineStatus={order.orderStatus}
                    timelineTotal={order.totalPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  />
                ))
              )}
          </ol>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default TimelineOrders;
