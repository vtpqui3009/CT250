import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { UilPlus, UilMinus } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [count, setCount] = useState(1);
  const [loadedProduct, setLoadedProduct] = useState([]);
  const [loadedProductImages, setLoadedProductImages] = useState([]);
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/product/${params.pid}`
        );
        const responseData = await response.data;
        setLoadedProduct(responseData.product);
        setLoadedProductImages(responseData.product.images);
        console.log(responseData);
      } catch (err) {}
    };
    fetchDetailProduct();
  }, [params.pid]);
  const handleQuantityChange = (e) => {
    setCount(e.target.value);
  };
  const handleIncreaseQuantity = () => {
    setCount((count) => count + 1);
  };
  const handleDecreaseQuantity = () => {
    if (count < 1) {
      setCount(1);
    }
    setCount((count) => count - 1);
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, cartQuantity: count }));
    navigate("/cart");
  };
  return (
    <>
      <Navigation />
      <h1 className="bg-base-color text-white text-center">
        Super Deal! Free shipping on Order Over 500.000{" "}
      </h1>
      <main className="w-[90%] ml-[5%] my-24">
        {loadedProduct && (
          <section className="flex items-center w-full gap-[20px]">
            <div className="w-1/2">
              {loadedProductImages && (
                <div
                  className={
                    loadedProductImages.length > 1 ? "image-container" : null
                  }
                >
                  {loadedProductImages.map((image, index) => (
                    <img
                      alt=""
                      src={image.url}
                      key={index}
                      className="h-[350px] w-full object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-1/2">
              <div className="">{loadedProduct.name}</div>
              <div className=" mt-2">{loadedProduct.description}</div>
              <div className="flex items-center mt-2">
                <p>{loadedProduct.price}VND</p>
              </div>
              <div className="flex items-center mt-2">
                <span>In Stock : </span>
                <p>{loadedProduct.stock}</p>{" "}
              </div>
              <div className="flex items-center mt-2">
                <span>Quantity : </span>
                <div className="ml-4 flex items-center">
                  <UilMinus
                    className="w-[16px] h-[16px] cursor-pointer"
                    onClick={handleDecreaseQuantity}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-gray-400 w-[40px] text-center rounded mx-2"
                    value={count}
                    min="1"
                    maxLength="3"
                    onChange={handleQuantityChange}
                  />
                  <UilPlus
                    className="w-[16px] h-[16px] cursor-pointer"
                    onClick={handleIncreaseQuantity}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex items-center border-[2px] border-base-color rounded mt-4 hover:bg-base-hover hover:text-white bg-border-[0px]"
                  onClick={() => handleAddToCart(loadedProduct)}
                >
                  <span className="px-4 py-1">Add to cart</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
export default ProductDetail;
