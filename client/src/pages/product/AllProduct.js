import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
// import Pagination from "../../components/UI/Pagination";
import { UilFilter } from "@iconscout/react-unicons";
import SidebarFilterAndSort from "./Sidebar/SidebarFilterAndSort";
const AllProduct = () => {
  const [loadedProduct, setLoadedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState("all");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("all");
  const [query, setQuery] = useState("/all");
  // const handlePaginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   console.log(pageNumber);
  // };
  const handleFilterProduct = () => {
    if (selectedPriceOption === selectedCategoryOption) {
      setQuery("/all");
    } else {
      setQuery(
        `?cat=${selectedCategoryOption}&price[lte]=${selectedPriceOption}`
      );
    }
    // setOpenSidebar(false);
    console.log(query);
  };
  useEffect(() => {
    const fetchLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products${query}`
        );
        const responseData = await response.data.products;
        setLoadedProduct(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchLoadedProduct();
  }, [query]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const handlePriceRadioChange = (e) => {
    console.log(e.target.value);
    setSelectedPriceOption(e.target.value);
  };
  const handleCategoryRadioChange = (e) => {
    console.log(e.target.value);
    setSelectedCategoryOption(e.target.value);
  };

  return (
    <React.Fragment>
      {openSidebar && (
        <SidebarFilterAndSort
          handleCloseSidebar={handleCloseSidebar}
          handlePriceRadioChange={handlePriceRadioChange}
          handleCategoryRadioChange={handleCategoryRadioChange}
          selectedPriceOption={selectedPriceOption}
          selectedCategoryOption={selectedCategoryOption}
          selectedPriceInitial={selectedPriceOption}
          selectedCategoryInitial={selectedCategoryOption}
          handleFilterProduct={handleFilterProduct}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Navigation />
          <div className="my-6 w-[80%] ml-[10%]">
            <header className="flex items-center justify-between ">
              <h1 className=" font-bold my-6 text-2xl uppercase">
                All Product
              </h1>
              <button
                className="flex items-center border-[1px] border-black px-4 py-2 cursor-pointer"
                onClick={handleOpenSidebar}
              >
                <span className="mr-2">Filter and Sort </span>
                <UilFilter size="16" />
              </button>
            </header>
            {loadedProduct && loadedProduct.length === 0 && (
              <div className="text-center my-6">
                No product updated yet. Please come back later.
              </div>
            )}
            <div className="grid grid-cols-4  gap-[2%]">
              {loadedProduct &&
                loadedProduct.map((product) => (
                  <div key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.images[0].url}
                        alt=""
                        className="w-4/5 h-[200px] ml-[10%]"
                      />
                    </Link>

                    <div className="text-center">
                      <Link to={`/product/${product._id}`}>
                        {" "}
                        <div>{product.name}</div>{" "}
                      </Link>
                      <div>
                        {product.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* 
          <Pagination
            dataPerPage={loadedProduct.length}
            totalData={totalProduct}
            paginate={handlePaginate}
          /> */}
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default AllProduct;
