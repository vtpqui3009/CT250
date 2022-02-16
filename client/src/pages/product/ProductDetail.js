import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { ShoppingCartIcon, TruckIcon } from "@heroicons/react/outline";
const ProductDetail = () => {
  const params = useParams();
  const [loadedProduct, setLoadedProduct] = useState([]);
  const [loadedProductImages, setLoadedProductImages] = useState([]);
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/${params.pid}`
        );
        const responseData = await response.data;
        setLoadedProduct(responseData.product);
        setLoadedProductImages(responseData.product.images);
        console.log(responseData);
      } catch (err) {}
    };
    fetchDetailProduct();
  }, [params.pid]);
  const handleQuantityChange = (e) => {};
  return (
    <>
      <Navigation />
      <main className="w-[90%] ml-[5%] my-8">
        <section className="flex w-full gap-[20px]">
          <div className="image-container w-1/2">
            {loadedProductImages &&
              loadedProductImages.map((image, index) => (
                <img alt="" src={image.url} key={index} />
              ))}
          </div>
          <div className="w-1/2">
            <div className="flex items-center">
              <span>Product name : </span>
              <p>{loadedProduct.name}</p>{" "}
            </div>

            <div className="flex items-center">
              <TruckIcon width="16" height="16" />
              <span>Mien Phi Van Chuyen</span>
            </div>
            <div className="flex items-center">
              <span>Price : </span>
              <p>{loadedProduct.price}</p>
            </div>

            <div className="flex items-center">
              <span>Stock : </span>
              <p>{loadedProduct.stock}</p>{" "}
            </div>
            <div className="flex items-center">
              <span>Quantity </span>
              <div>
                <span>-</span>
                <input
                  type="text"
                  value="1"
                  maxLength="3"
                  onChange={handleQuantityChange}
                />
                <span>+</span>
              </div>
            </div>
            <div>
              <button className="flex items-center">
                <ShoppingCartIcon size="4" />
                Add to cart
              </button>
            </div>
          </div>
        </section>
        <section>
          <p>Product Detail</p>
          <div>{loadedProduct.description}</div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ProductDetail;
