import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Pagination from "../../components/UI/Pagination";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState(0);
  const [loadedProduct, setLoadedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber);
  };
  useEffect(() => {
    const fetchLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products?page=${currentPage}`
        );
        const responseData = await response.data.products;
        setLoadedProduct(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchLoadedProduct();
  }, [currentPage]);
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products/all`
        );
        const responseData = await response.data.products;
        setAllProduct(responseData);
      } catch (err) {}
    };
    fetchAllProduct();
  }, []);
  console.log(loadedProduct.length);
  console.log(allProduct.length);
  console.log(Math.ceil(allProduct.length / loadedProduct.length));
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(allProduct.length / loadedProduct.length);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Navigation />
          <div className="my-6">
            <h1 className="w-[80%] ml-[10%] gap-[2%] font-bold my-6 text-xl">
              All Product
            </h1>
            {loadedProduct && loadedProduct.length === 0 && (
              <div className="text-center my-6">
                No product updated yet. Please come back later.
              </div>
            )}
            <div className="grid grid-cols-4 w-[80%] ml-[10%] gap-[2%]">
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
          <ul className="flex items-center w-[76%] ml-[12%] my-4">
            {pageNumbers.length === 1 ? (
              <div></div>
            ) : (
              <>
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className="border-[1px] border-base-color px-3 py-1 mr-4 rounded-full cursor-pointer"
                    // style={{
                    //   backgroundColor: number === activePage ? "#97AE76" : "",
                    //   color: number === activePage ? "white" : "",
                    // }}
                    // onClick={() => {
                    //   setActivePage(number);
                    // }}
                  >
                    <span onClick={() => handlePaginate(number)}>{number}</span>
                  </li>
                ))}
              </>
            )}
          </ul>
          {/* <Pagination
            dataPerPage={loadedProduct.length}
            totalData={allProduct.length}
            paginate={handlePaginate}
          /> */}
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default AllProduct;
