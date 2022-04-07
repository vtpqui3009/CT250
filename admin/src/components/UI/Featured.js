import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = ({ value, percentage }) => {
  return (
    <div className="featured w-1/2 text-sm h-full">
      <div className="flex items-center justify-center text-gray-500">
        <h1 className="title p-4">Total Revenue</h1>
      </div>
      <div className="flex items-center justify-center flex-col p-4">
        <div className="w-[100px] h-[100px]">
          <CircularProgressbar
            value={percentage}
            text={`${percentage + "%"}`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="text-2xl">{value}</p>
        <p className=" text-center text-[13px]">
          Previous transactions processing. Last payments may not be included.
        </p>
      </div>
    </div>
  );
};

export default Featured;
