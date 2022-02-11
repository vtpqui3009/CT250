import axios from "axios";
import React, { useState, useEffect } from "react";
import FeatureItem from "./FeatureItem";
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
    <div className="w-[90%] ml-[5%] font-playfair">
      <h1 className="heading">Feature Product</h1>
      <FeatureItem featureProducts={featureProducts} />
    </div>
  );
};
export default Feature;
