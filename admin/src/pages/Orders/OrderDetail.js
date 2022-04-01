import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
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
          `${process.env.REACT_APP_BASE_API}/order/${param.oid}`
        );
        const responseData = await response.data.order;
        setOrderDetail(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [param.oid]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Layout
          chilren={
            <div className="w-full h-full bg-bg-color pt-[8%]">
              <HeadingPath
                heading="Order Detail "
                chilren={
                  <>
                    <HeadingPathItem
                      pathname="Organic"
                      pathnameClass="text-gray-900"
                    />
                    <HeadingPathItem
                      pathname="Order"
                      pathnameClass="text-gray-900"
                    />
                    <HeadingPathItem
                      pathname="Order Detail"
                      pathnameClass="text-gray-400"
                      iconClass="hidden"
                    />
                  </>
                }
              />
              <div className="text-[14px] w-[90%] ml-[5%]">
                <div>
                  <h1 className="text-[15px] font-semibold mb-2">Customer</h1>
                  <div className="ml-[5%] leading-6">
                    <span>Customer name : </span>
                    <span>{orderDetail && orderDetail.user.name}</span>
                  </div>
                  <div className="ml-[5%] leading-6">
                    <span>Customer email : </span>
                    <span>{orderDetail && orderDetail.user.email}</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-[15px] font-semibold mb-2">Shipping</h1>
                  <div className="ml-[5%] leading-6">
                    <span> Shipper name : </span>
                    <span> {orderDetail && orderDetail.shippingInfo.name}</span>
                  </div>
                  <div className="ml-[5%] leading-6">
                    <span> Address :</span>
                    <span>
                      {" "}
                      {orderDetail && orderDetail.shippingInfo.address}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6">
                    <span> Phone :</span>
                    <span>
                      {" "}
                      {orderDetail && orderDetail.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6">
                    <span> Gender :</span>
                    <span>
                      {" "}
                      {orderDetail && orderDetail.shippingInfo.gender}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6">
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
                <div>
                  <h1 className="text-[15px] font-semibold mb-2">Order Item</h1>
                  <div className="grid grid-cols-4 gap-4 text-center ml-[5%] leading-6">
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
                  <div className="ml-[5%] leading-6">
                    <span>Order status : </span>
                    <span>{orderDetail && orderDetail.orderStatus}</span>
                  </div>
                  <div className="ml-[5%] leading-6">
                    <span>Created At : </span>
                    <span>
                      {orderDetail && orderDetail.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <div className="ml-[5%] leading-6">
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
                    <button className="px-4 py-2 text-white bg-sidebar-color text-[12px] rounded ">
                      Go back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};
export default OrderDetail;
