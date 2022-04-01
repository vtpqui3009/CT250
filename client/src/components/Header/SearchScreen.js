import { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { UilTimes } from "@iconscout/react-unicons";
import axios from "axios";
import { Link } from "react-router-dom";
const SearchScreen = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);
  useEffect(() => {
    const getLoadedProducts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/products?keyword=${inputValue}`
      );
      const responseData = await response.data.products;
      // console.log(responseData);
      setLoadedProducts(responseData);
    };
    const timoutId = setTimeout(() => {
      getLoadedProducts();
    }, 500);

    return () => {
      clearTimeout(timoutId);
    };
  }, [inputValue]);

  const handleInputChange = (e) => {
    if (e.target.value.trim().length > 0) {
      setFocus(true);
    }
    setInputValue(e.target.value);
  };
  const handleOpenSearchbar = () => {
    setOpen(true);
  };
  const handleCloseSearchbar = () => {
    setOpen(false);
    setFocus(false);
    setInputValue("");
  };
  return (
    <div className=" hidden md:block relative z-40">
      <div
        className="flex items-center mr-2 absolute top-[-16px] right-10 w-[200px] "
        style={{
          background: open ? "white" : "",
        }}
      >
        <div
          className=" flex items-center justify-center "
          style={{
            width: open ? "20%" : "16px",
            transform: open ? "translateX(0)" : "translateX(220px)",
          }}
        >
          <SearchIcon
            className=" w-4 h-4 cursor-pointer"
            onClick={handleOpenSearchbar}
          />
        </div>
        <input
          type="text"
          className="mr-4 rounded py-[6px] px-2 bg-transparent focus:outline-none outline-none "
          style={{
            width: open ? "80%" : "0",
          }}
          onChange={handleInputChange}
          value={inputValue}
        />
        {open && (
          <UilTimes
            className="w-6 h-6 translate-x-[-50%] cursor-pointer"
            onClick={handleCloseSearchbar}
          />
        )}
      </div>
      {focus &&
        loadedProducts &&
        loadedProducts?.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="absolute left-[-250px] flex gap-4 items-center top-10 w-[200px] bg-white p-2 hover:bg-gray-200 cursor-pointer">
              <div className="w-[40%]">
                <img
                  src={product.images[0].url}
                  alt=""
                  className="w-full h-[70px] object-cover"
                />
              </div>
              <div className="w-[60%]">
                <div> {product.name}</div>
                <div>
                  {product.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default SearchScreen;
