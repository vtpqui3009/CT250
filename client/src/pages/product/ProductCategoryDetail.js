import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import Pagination from "../../components/UI/Pagination";
const productCategory = ["Meat", "Vegetable", "Fruit"];
const ProductCategoryDetail = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [selectValue, setSelectValue] = useState(params.type);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);

  const indexOfLastRecord = currentPage * dataPerPage;
  const indexOfFirstRecord = indexOfLastRecord - dataPerPage;
  const currentRecord = loadedProducts.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  const unExistingSelectValue = productCategory.filter(
    (category) => category !== selectValue
  );
  useEffect(() => {
    const fetchLoadedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products?cat=${selectValue}`
        );
        const responseData = await response.data.products;
        setLoadedProducts(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchLoadedProducts();
  }, [selectValue]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Navigation />
          <div className="my-6 w-[80%] ml-[10%]">
            <header className="flex items-center justify-between">
              <h1 className=" gap-[2%] font-bold my-6 text-xl">
                {selectValue}
              </h1>
              <select
                onChange={handleSelectChange}
                className="focus:outline-none border-[1px] border-gray-500"
              >
                <option key={selectValue} value={selectValue}>
                  {selectValue}
                </option>
                {unExistingSelectValue.map((value) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
            </header>
            {loadedProducts.length === 0 && (
              <div className="text-center my-6">
                No product updated yet. Please come back later.
              </div>
            )}
            <div className="grid grid-cols-4  gap-[2%]">
              {currentRecord &&
                currentRecord.map((product) => (
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
          <Pagination
            dataPerPage={dataPerPage}
            totalData={loadedProducts.length}
            paginate={handlePaginate}
          />
          <Footer />
        </React.Fragment>
      )}
    </>
  );
};
export default ProductCategoryDetail;
