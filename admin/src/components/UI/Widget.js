import React from "react";
import {
  UilUsersAlt,
  UilShoppingBag,
  UilShop,
  UilWallet,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  let data;
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalMoney, setTotalMoney] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLoadedUsers = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          ` ${process.env.REACT_APP_BASE_API}/admin/users`
        );
        const responseData = await response.data.users;
        const filterData = responseData.filter((data) => data.role === "user");
        setTotalUsers(filterData ? filterData.length : 0);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/orders`
        );
        const responseData = await response.data.orders;
        const deliveredOrder = responseData.filter(
          (order) => order.orderStatus === "Delivered"
        );
        const orderTotalPrice = deliveredOrder.map((order) => order.totalPrice);

        const totalPrice = orderTotalPrice.reduce((prev, next) => {
          return prev + next;
        }, 0);

        setTotalOrders(responseData ? responseData.length : 0);
        setTotalMoney(
          responseData
            ? totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : 0
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    const getLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products/all`
        );
        const responseData = await response.data.products;
        setTotalProducts(responseData ? responseData.length : 0);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getLoadedUsers();
    fetchOrders();
    getLoadedProduct();
  }, []);

  //temporary
  switch (type) {
    case "user":
      data = {
        title: "Users",
        isMoney: false,
        link: <Link to="/customer/manage">See all users</Link>,
        icon: (
          <UilUsersAlt className="w-10 h-10 p-2 rounded-full bg-blue-500 text-white" />
        ),
        amount: totalUsers,
      };
      break;
    case "order":
      data = {
        title: "Orders",
        isMoney: false,
        link: <Link to="/orders/manage">See all orders</Link>,
        icon: (
          <UilShoppingBag className="w-10 h-10 p-2 rounded-full bg-green-500 text-white" />
        ),
        amount: totalOrders,
      };
      break;
    case "earning":
      data = {
        title: "Products",
        isMoney: true,
        link: "All product",
        icon: (
          <UilShop className="w-10 h-10 p-2 rounded-full bg-yellow-300 text-white" />
        ),
        amount: totalProducts,
      };
      break;
    case "balance":
      data = {
        title: "Wallet",
        isMoney: true,
        link: "Total money",
        icon: (
          <UilWallet className="w-10 h-10 p-2 rounded-full bg-red-500 text-white" />
        ),
        amount: totalMoney,
      };
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="w-[212px] h-[139px]  border-2 rounded-md ">
          <div className="flex animate-pulse flex-col items-start justify-center h-full">
            <div className="w-4/5 bg-gray-300 h-1/2 rounded-md my-2 ml-4"></div>
            <div className="flex flex-col pb-2 h-1/2 my-2 ml-4">
              <div className="w-24 bg-gray-300 rounded-md h-1/2  py-3"></div>
              <div className="w-36 bg-gray-300 h-1/2 rounded-md my-2 py-3"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-8 py-4 border-2 rounded">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{data.title}</span>
            <div className="flex items-center text-sm">
              <span>{data.icon}</span>
            </div>
          </div>
          <div className="font-light text-xl my-2">{data.amount}</div>
          <div className="w-max text-[12px] border-b border-gray-500">
            <span>{data.link}</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Widget;
