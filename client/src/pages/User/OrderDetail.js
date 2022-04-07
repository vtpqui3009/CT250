import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Container from "../../components/UI/Container";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import moment from "moment";
const OrderDetail = () => {
  const param = useParams();

  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/order/${param.orderId}`
        );
        const responseData = await response.data.order;
        setOrderDetail(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [param.orderId]);
  return (
    <React.Fragment>
      <Navigation />
      <Container
        chilren={
          <React.Fragment>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <React.Fragment>
                <h1 className="uppercase text-xl my-4 font-bold">
                  Order Detail
                </h1>
                <div className="mb-4">
                  <h1 className="text-[15px] font-semibold py-2">Customer</h1>
                  <div className="ml-[5%] leading-6 py-1">
                    <span>Customer name : </span>
                    <span>{orderDetail && orderDetail.user.name}</span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span>Customer email : </span>
                    <span>{orderDetail && orderDetail.user.email}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-[15px] font-semibold mb-2">Shipping</h1>
                  <div className="ml-[5%] leading-6 py-1">
                    <span> Shipper name : </span>
                    <span> {orderDetail && orderDetail.shippingInfo.name}</span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span> Address :</span>
                    <span>
                      {" "}
                      {orderDetail && orderDetail.shippingInfo.address}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span> Phone :</span>
                    <span>
                      {" "}
                      {orderDetail && orderDetail.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span> Gender :</span>
                    <span>
                      {" "}
                      {orderDetail && orderDetail.shippingInfo.gender}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span> Shipping price :</span>
                    <span>
                      {" "}
                      {orderDetail &&
                        parseInt(orderDetail.shippingPrice).toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-[15px] font-semibold mb-2">Order Item</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center ml-[5%] leading-6">
                    {orderDetail &&
                      orderDetail?.orderItems.map((item) => (
                        <div key={item._id}>
                          <img
                            src={item.image}
                            alt=""
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                          <div>{item.name}</div>
                          <div>
                            {item.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                        </div>
                      ))}
                  </div>{" "}
                  <div className="ml-[5%] leading-6 py-1">
                    <span>Order status : </span>
                    <span>{orderDetail && orderDetail.orderStatus}</span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span>Created At : </span>
                    <span>
                      {orderDetail && moment(orderDetail.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6 py-1">
                    <span>Total Price : </span>
                    <span>
                      {orderDetail &&
                        orderDetail.totalPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center py-[5%]">
                  <Link to="/">
                    <button className="px-4 py-2 text-white bg-green-700 text-sm rounded ">
                      Go back
                    </button>
                  </Link>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        }
      />
      <Footer />
    </React.Fragment>
  );
};
export default OrderDetail;
