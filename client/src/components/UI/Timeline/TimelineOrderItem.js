import TimelineContainer from "./TimelineContainer";
import { Link } from "react-router-dom";
const TimelineItem = ({
  orderId,
  timelineTime,
  timelineImage,
  timelineStatus,
  timelineTotal,
}) => {
  return (
    <TimelineContainer
      chilren={
        <li className="mb-10 ml-6">
          <h3 className="flex py-1 text-lg font-semibold text-gray-900">
            <span>You just bought</span>
            <img
              src={timelineImage}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover ml-2 -translate-y-2"
            />
            {new Date(timelineTime).toLocaleDateString("vi-VI") ===
              new Date().toLocaleTimeString("vi-VI") && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                Latest
              </span>
            )}
          </h3>
          <time className="block py-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Order date : {timelineTime}
          </time>
          <span className="block py-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Status :{" "}
            <span
              className={
                timelineStatus === "Delivered"
                  ? "delivered-status"
                  : "processing-status"
              }
            >
              {timelineStatus}
            </span>
          </span>
          <span className="block py-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Total : {timelineTotal}
          </span>
          <div className="py-2 flex items-center justify-between">
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Your order is being prepair. We will consider it as soon as
              possible. Thank for chosing Organic Shop.
            </p>
            <Link
              to={`/user/order/${orderId}`}
              className="underline text-green-500 text-sm"
            >
              View Detail
            </Link>
          </div>
        </li>
      }
    >
      {" "}
    </TimelineContainer>
  );
};
export default TimelineItem;
