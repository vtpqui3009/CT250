import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import ManageProductTable from "../../components/Content/Product/ManageProductTable";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const ManageProduct = () => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [selectValue, setSelectValue] = useState(5);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryProduct, setQueryProduct] = useState(null);
  useEffect(() => {
    const getLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products/all`
        );
        const responseData = await response.data.products;
        console.log(responseData);
        setLoadedProducts(responseData);
        setIsLoading(false);
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
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/product/${id}`
      );
      setLoadedProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    const getLoadedProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products?keyword=${query}`
        );
        const responseData = await response.data.products;
        setQueryProduct(responseData);
        console.log(responseData);
      } catch (err) {}
    };
    const timoutId = setTimeout(() => {
      getLoadedProduct();
    }, 500);
    return () => {
      clearTimeout(timoutId);
    };
  }, [query]);
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
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
            {!query ? (
              <ManageProductTable
                productData={loadedProducts}
                onDeleteProduct={handleDeleteProduct}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                fromItem="1"
                toItem={selectValue}
                totalItem={loadedProducts.length}
              />
            ) : (
              <ManageProductTable
                productData={queryProduct}
                onDeleteProduct={handleDeleteProduct}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                fromItem="1"
                toItem={selectValue}
                totalItem={loadedProducts.length}
              />
            )}
          </div>
        }
      />
    </React.Fragment>
  );
};
export default ManageProduct;
