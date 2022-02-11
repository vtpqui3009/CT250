import navData from "./navData";
import { SearchIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const NavbarList = () => {
  return (
    <ul className="flex md:flex-row flex-col md:items-center justify-center">
      <header className="block md:hidden w-full">
        <div className="flex items-center px-4 py-2">
          <input
            type="text"
            placeholder="Nhập thực phẩm cần tìm ... "
            className="w-full border-[1px] border-gray-400 text-[12px] px-4 py-[6px] rounded mr-2"
          />
          <SearchIcon className="w-4 h-4 ml-[-35px]" />
        </div>
      </header>
      {navData.map((data) => (
        <li
          key={data.id}
          className="md:ml-14 md:p-0 p-4 hover:text-green-600 ease-linear duration-300 md:text-base text-sm"
        >
          <a href="#home">{data.name}</a>
        </li>
      ))}
      <Link to="/login">
        <li className="md:hidden block md:p-0 p-4 md:text-base text-sm">
          Log in
        </li>
      </Link>
    </ul>
  );
};
export default NavbarList;
