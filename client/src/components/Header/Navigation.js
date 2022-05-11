import { Fragment } from "react";
import Navbar from "./Navbar/Navbar";
import Aside from "./Aside";
import { Link } from "react-router-dom";
// import { UilTopArrowFromTop } from "@iconscout/react-unicons";
const Navigation = (props) => {
  return (
    <Fragment>
      <div
        className="flex items-center justify-between md:px-20 md:py-8 px-10 py-4"
        style={props.style}
      >
        <Link to="/">
          <h1 className="text-3xl">Organic</h1>
        </Link>
        <Navbar />
        <Aside />
      </div>
      {/* <UilTopArrowFromTop className="w-10 h-10 bg-[#97b83e] text-white fixed bottom-10 right-10 rounded-full p-2.5 z-[999]" /> */}
    </Fragment>
  );
};
export default Navigation;
