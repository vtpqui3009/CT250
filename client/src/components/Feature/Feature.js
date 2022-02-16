import axios from "axios";
import React, { useState, useEffect } from "react";
import FeatureItem from "./FeatureItem";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const Feature = () => {
  const [featureProducts, setFeatureProducts] = useState([]);
  useEffect(() => {
    const getFeatureProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/products"
        );
        const responseData = await response.data.products;
        const filterData = responseData.slice(0, 8);
        setFeatureProducts(filterData);
        console.log(responseData);
      } catch (err) {}
    };
    getFeatureProducts();
  }, []);
  return (
    <div className="w-[90%] ml-[5%]">
      <h1 className="heading font-playfair">Feature Product</h1>
      <Link to="/product/all">
        <div className="flex items-center mb-6 w-full">
          <span className="ml-auto">View all </span>
          <ChevronDoubleRightIcon className="w-4 h-4 ml-2" />
        </div>
      </Link>
      <FeatureItem featureProducts={featureProducts} />
    </div>
  );
};
export default Feature;
