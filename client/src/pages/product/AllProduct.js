import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { UilFilter } from "@iconscout/react-unicons";
import SidebarFilterAndSort from "./Sidebar/SidebarFilterAndSort";
import Pagination from "../../components/UI/Pagination";
const AllProduct = () => {
  const [loadedProduct, setLoadedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState("all");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("all");
  const [query, setQuery] = useState("/all");
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
  const handlePriceChange = (e) => {
    setSelectedPriceOption(e.target.value);
    console.log(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategoryOption(e.target.value);
    console.log(e.target.value);
  };
  const handleFilterProduct = () => {
    const queryMeatArr = [
      `?cat=Meat&price[lte]=50000`,
      `?cat=Meat&price[gte]=50000&price[lte]=100000`,
      `?cat=Meat&price[gte]=100000&price[lte]=300000`,
      `?cat=Meat&price[gte]=300000&price[lte]=500000`,
    ];
    const queryFruitArr = [
      `?cat=Fruit&price[lte]=50000`,
      `?cat=Fruit&price[gte]=50000&price[lte]=100000`,
      `?cat=Fruit&price[gte]=100000&price[lte]=300000`,
      `?cat=Fruit&price[gte]=300000&price[lte]=500000`,
    ];
    const queryVegetableArr = [
      `?cat=Vegetable&price[lte]=50000`,
      `?cat=Vegetable&price[gte]=50000&price[lte]=100000`,
      `?cat=Vegetable&price[gte]=100000&price[lte]=300000`,
      `?cat=Vegetable&price[gte]=300000&price[lte]=500000`,
    ];
    if (selectedPriceOption === "all" && selectedCategoryOption === "all") {
      setQuery("/all");
    }
    if (selectedPriceOption === "all") {
      setQuery(`/cat=${selectedCategoryOption}`);
    }
    if (selectedCategoryOption === "all") {
      setQuery(`all`);
    }
    if (
      selectedPriceOption === "< 50000" &&
      selectedCategoryOption === "Meat"
    ) {
      setQuery(queryMeatArr[0]);
    }
    if (
      selectedPriceOption === "50000 - 100000" &&
      selectedCategoryOption === "Meat"
    ) {
      setQuery(queryMeatArr[1]);
    }
    if (
      selectedPriceOption === "100000 - 300000" &&
      selectedCategoryOption === "Meat"
    ) {
      setQuery(queryMeatArr[2]);
    }
    if (
      selectedPriceOption === "300000 - 500000" &&
      selectedCategoryOption === "Meat"
    ) {
      setQuery(queryMeatArr[3]);
    }
    if (
      selectedPriceOption === "< 50000" &&
      selectedCategoryOption === "Fruit"
    ) {
      setQuery(queryFruitArr[0]);
    }
    if (
      selectedPriceOption === "50000 - 100000" &&
      selectedCategoryOption === "Fruit"
    ) {
      setQuery(queryFruitArr[1]);
    }
    if (
      selectedPriceOption === "100000 - 300000" &&
      selectedCategoryOption === "Fruit"
    ) {
      setQuery(queryFruitArr[2]);
    }
    if (
      selectedPriceOption === "300000 - 500000" &&
      selectedCategoryOption === "Fruit"
    ) {
      setQuery(queryFruitArr[3]);
    }
    if (
      selectedPriceOption === "< 50000" &&
      selectedCategoryOption === "Vegetable"
    ) {
      setQuery(queryVegetableArr[0]);
    }
    if (
      selectedPriceOption === "50000 - 100000" &&
      selectedCategoryOption === "Vegetable"
    ) {
      setQuery(queryVegetableArr[1]);
    }
    if (
      selectedPriceOption === "100000 - 300000" &&
      selectedCategoryOption === "Vegetable"
    ) {
      setQuery(queryVegetableArr[2]);
    }
    if (
      selectedPriceOption === "300000 - 500000" &&
      selectedCategoryOption === "Vegetable"
    ) {
      setQuery(queryVegetableArr[3]);
    }
    // setOpenSidebar(false);
    console.log(query);
  };
  const handleClearFilter = () => {
    setSelectedPriceOption("all");
    setSelectedCategoryOption("all");
    // setQuery("/all");
    console.log("ok");
  };
  return (
    <React.Fragment>
      {openSidebar && (
        <SidebarFilterAndSort
          handleCloseSidebar={handleCloseSidebar}
          handlePriceChange={handlePriceChange}
          handleCategoryChange={handleCategoryChange}
          selectedPriceOption={selectedPriceOption}
          selectedCategoryOption={selectedCategoryOption}
          selectedPriceInitial={selectedPriceOption}
          selectedCategoryInitial={selectedCategoryOption}
          handleFilterProduct={handleFilterProduct}
          handleClearFilter={handleClearFilter}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <Navigation />
          <div className="my-6 w-[80%] ml-[10%] flex-1">
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

            <Pagination dataPerPage="10" data={loadedProduct} />
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default AllProduct;
