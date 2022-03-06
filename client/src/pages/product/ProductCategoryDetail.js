import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import { UilFilter } from "@iconscout/react-unicons";
import SidebarFilterAndSort from "./Sidebar/SidebarFilterAndSort";
const ProductCategoryDetail = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState("all");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(
    params.type
  );
  const [query, setQuery] = useState(`?cat=${params.type}`);

  const handleFilterProduct = () => {
    setQuery(
      `?cat=${selectedCategoryOption}&price[lte]=${selectedPriceOption}`
    );
    console.log(query);
  };
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

  useEffect(() => {
    const fetchLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products${query}`
        );
        const responseData = await response.data.products;
        setLoadedProducts(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchLoadedProduct();
  }, [query]);
  return (
    <>
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
          categoryFirstElStyle={{ display: "none" }}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Navigation />
          <div className="my-6 w-[80%] ml-[10%]">
            <header className="flex items-center justify-between">
              <h1 className=" font-bold my-6 text-2xl uppercase">
                {selectedCategoryOption}
              </h1>
              <button
                className="flex items-center border-[1px] border-black px-4 py-2 cursor-pointer"
                onClick={handleOpenSidebar}
              >
                <span className="mr-2">Filter and Sort </span>
                <UilFilter size="16" />
              </button>
            </header>
            {loadedProducts.length === 0 && (
              <div className="text-center my-6">
                No product updated yet. Please come back later.
              </div>
            )}
            <div className="grid lg:grid-cols-5 md:grid-cols-3 md:py-[5%] py-[15%] gap-[2%]">
              {loadedProducts &&
                loadedProducts.map((product) => (
                  <div key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.images[0].url}
                        alt=""
                        className="w-full object-cover h-[200px]"
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
          <Footer />
        </React.Fragment>
      )}
    </>
  );
};
export default ProductCategoryDetail;
