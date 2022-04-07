import React, { useState, useEffect } from "react";
import TimelineNotiItem from "./TimelineNotiItem";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const TimelineNoti = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser && currentUser.user._id;
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/notification/${userId}`
        );
        const responseData = await response.data.comments;
        setNotifications(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [userId]);

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <h1 className="uppercase text-xl my-4 font-bold">My notifications</h1>
          {notifications.length > 0 ? (
            notifications?.map((noti) => (
              <TimelineNotiItem
                key={noti._id}
                orderId={noti.orderId}
                timelineTime={moment(noti.createdAt).fromNow()}
                timelineNotiImage={noti.senderAvatar}
                timelineMessage={noti.message}
                timelineSender={noti.senderName}
              />
            ))
          ) : (
            <div className="mb-[25vh]">There no notification sent to you.</div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default TimelineNoti;
