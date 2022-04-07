import { Link } from "react-router-dom";
const TimelineNotiItem = ({
  timelineNotiImage,
  timelineTime,
  timelineSender,
  timelineMessage,
  orderId,
}) => {
  return (
    <ol className="relative border-l border-gray-400 ">
      <li className="mb-10 ml-6">
        <span className="flex absolute -left-3 justify-center items-center w-12 h-12 bg-blue-200 rounded-full ring-8 ring-white">
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={timelineNotiImage}
            alt=""
          />
        </span>
        <div className="ml-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:border-gray-600">
          <div className="justify-between items-center mb-3 sm:flex">
            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
              {timelineTime}
            </time>
            <div className="text-sm font-normal text-gray-500 ">
              Message from {timelineSender}
            </div>
          </div>
          <div className="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-500 flex justify-between">
            <span> {timelineMessage}</span>

            <Link to={`/user/order/${orderId}`}>View Detail</Link>
          </div>
        </div>
      </li>
    </ol>
  );
};
export default TimelineNotiItem;
