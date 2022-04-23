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
import LoadingSpinner from "../../components/UI/LoadingSpinner";
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/product/${params.pid}`
        );
        const responseData = await response.data.product;
        document.title = `Chi tiết sản phẩm - ${responseData.name}`;
        setLoadedProduct(responseData);
        setLoadedProductImages(responseData.images);
        console.log(responseData.price);
        setProductPrice(
          responseData.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchDetailProduct();
  }, [params.pid]);
  // useEffect(() => {
  //   document.title = loadedProduct.name;
  // }, [loadedProduct.name]);
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Navigation />
          <h1 className="bg-base-color text-white text-center">
            Super Deal! Free shipping on Order Over 500.000{" "}
          </h1>
          <main className="w-[90%] ml-[5%] my-12 md:my-24">
            {loadedProduct && (
              <section className="flex flex-col md:flex-row w-full gap-[5%]">
                <div className="block md:hidden">
                  <div className="flex items-center mt-2">
                    <div className="mr-4">{loadedProduct.name}</div>
                    <Rating props={loadedProduct} />
                  </div>
                  <div className="my-2">Price : {productPrice}</div>
                </div>
                <div className="w-full">
                  {loadedProductImages && (
                    <div
                      className={
                        loadedProductImages.length > 1
                          ? "image-container"
                          : null
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
                <div className="w-full ">
                  <div className="md:block hidden">
                    <div className="flex items-center mt-2">
                      <div className="mr-4">{loadedProduct.name}</div>
                      <Rating props={loadedProduct} />
                    </div>
                    <div className="my-2">Price : {productPrice}</div>
                  </div>
                  <div className=" mt-2">{loadedProduct.description}</div>

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
                      className="flex items-center border-[2px] border-base-color rounded mt-4 hover:bg-base-hover hover:text-white bg-border-[0px] "
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
              <div className="md:flex items-center justify-center h-screen relative">
                <UilTimes
                  size="30"
                  className="absolute md:top-4 top-[-8%] right-[5%] text-white cursor-pointer"
                  onClick={handleCloseImageScreen}
                />
                {loadedProductImages && (
                  <div className="block md:flex md:justify-between md:items-center w-[90%] relative">
                    <UilAngleLeft
                      size="40"
                      className="text-white cursor-pointer lg:relative absolute top-[45%] left-6 "
                      onClick={handlePrevImage}
                    />
                    <img
                      src={loadedProductImages[imageIndex].url}
                      alt=""
                      className="object-cover mt-[60%] sm:ml-0 ml-[5%] sm:mt-0 w-full sm:w-[100%] lg:w-[60%] bg-cover h-[30vh] sm:h-[50vh] lg:h-[70vh]"
                    />
                    <UilAngleRight
                      size="40"
                      className="text-white cursor-pointer lg:relative absolute top-[44%] sm:right-[15px]  right-[-16px]"
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
      )}
    </>
  );
};
export default ProductDetail;
