import Navbar from "./Navbar/Navbar";
import Aside from "./Aside";
import { Link } from "react-router-dom";
const Navigation = (props) => {
  return (
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
  );
};
export default Navigation;
