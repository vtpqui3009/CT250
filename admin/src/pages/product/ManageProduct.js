import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import ManageProductTable from "../../components/Content/Product/ManageProductTable";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const ManageProduct = () => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState("");
  // const [searchProducts, setSearchProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/products"
        );
        const responseData = await response.data.products;
        const filterData = responseData.slice(0, 5);
        setLoadedProducts(filterData);
        setFilterProducts(filterData.length);
        setIsLoading(false);
        console.log(responseData);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getLoadedProduct();
  }, []);
  const handleDeleteProduct = async (id) => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`);
      setLoadedProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    setLoadedProducts((product) =>
      product.filter((product) => product.toString().includes(e.target.value))
    );
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Layout
        chilren={
          <div className="w-full h-full bg-bg-color pt-[8%]">
            <HeadingPath
              heading="Manage Product"
              chilren={
                <React.Fragment>
                  <HeadingPathItem
                    pathname="Organic"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Product"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Manage Product"
                    pathnameClass="text-gray-400"
                    iconClass="hidden"
                  />
                </React.Fragment>
              }
            />

            <ManageProductTable
              productData={loadedProducts}
              onDeleteProduct={handleDeleteProduct}
              handleInputChange={handleInputChange}
              fromItem={filterProducts.length}
              toItem="unknown"
              totalItem={loadedProducts.length}
            />
          </div>
        }
      />
    </React.Fragment>
  );
};
export default ManageProduct;
