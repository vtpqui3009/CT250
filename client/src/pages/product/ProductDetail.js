import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  UilPlus,
  UilMinus,
  UilTimes,
  UilAngleLeft,
  UilAngleRight,
} from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Comments from "./Comments";
import Rating from "./Rating";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [count, setCount] = useState(1);
  const [loadedProduct, setLoadedProduct] = useState([]);
  const [loadedProductImages, setLoadedProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState();
  const [imagePreviewScreen, setImagePreviewScreen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/product/${params.pid}`
        );
        const responseData = await response.data.product;
        setLoadedProduct(responseData);
        setLoadedProductImages(responseData.images);
        setProductPrice(
          responseData.product.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        );
      } catch (err) {}
    };
    fetchDetailProduct();
  }, [params.pid]);

  const handleQuantityChange = (e) => {
    setCount(e.target.value);
  };
  const handleIncreaseQuantity = (e) => {
    setCount((count) => (count < 10 ? count + 1 : (count = 10)));
  };
  const handleDecreaseQuantity = (e) => {
    setCount((count) => (count <= 1 ? (count = 1) : count - 1));
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, cartQuantity: count }));
    navigate("/cart");
  };
  const handlePrevImage = () => {
    setImageIndex((index) =>
      index > 1 ? index - 1 : (index = loadedProductImages.length - 1)
    );
  };
  const handleNextImage = () => {
    setImageIndex((index) =>
      index < loadedProductImages.length - 1 ? index + 1 : (index = 0)
    );
  };
  const handleOpenImageScreen = (index) => {
    setImageIndex(index);
    setImagePreviewScreen(true);
  };
  const handleCloseImageScreen = () => {
    setImagePreviewScreen(false);
  };

  return (
    <>
      <Navigation />
      <h1 className="bg-base-color text-white text-center">
        Super Deal! Free shipping on Order Over 500.000{" "}
      </h1>
      <main className="w-[90%] ml-[5%] my-24">
        {loadedProduct && (
          <section className="flex  w-full gap-[5%]">
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
                      className="h-[350px] w-full object-cover cursor-pointer"
                      onClick={() => handleOpenImageScreen(index)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-1/2">
              <div>
                <div className="">{loadedProduct.name}</div>
                <Rating props={loadedProduct} />
                {/* <Rating /> */}
              </div>
              <div className=" mt-2">{loadedProduct.description}</div>
              <div className="flex items-center mt-2">
                <div>{productPrice}</div>
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
                    max="10"
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
      {imagePreviewScreen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-40">
          <div className="flex items-center justify-center h-screen relative">
            <UilTimes
              size="30"
              className="absolute top-[5%] right-[5%] text-white cursor-pointer"
              onClick={handleCloseImageScreen}
            />
            {loadedProductImages && (
              <div className="flex justify-between items-center w-[90%]">
                <UilAngleLeft
                  size="40"
                  className="text-white cursor-pointer"
                  onClick={handlePrevImage}
                />
                <img
                  src={loadedProductImages[imageIndex].url}
                  alt=""
                  className="object-cover w-[60%] bg-cover h-[80vh]"
                />
                <UilAngleRight
                  size="40"
                  className="text-white cursor-pointer"
                  onClick={handleNextImage}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <Comments productId={params.pid} props={loadedProduct} />
      <Footer />
    </>
  );
};
export default ProductDetail;
