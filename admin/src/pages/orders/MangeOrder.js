import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ManageOrderTable from "../../components/Content/Order/ManageOrdersTable";
const ManageOrders = () => {
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLoadedOrders = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          ` "${process.env.REACT_APP_BASE_API}/admin/orders`
        );
        const responseData = await response.data;
        const filterData = responseData.slice(0, 5);
        setLoadedOrders(filterData);
        setFilterOrders(filterData.length);
        setIsLoading(false);
        console.log(responseData);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getLoadedOrders();
  }, []);
  const handleDeleteOrder = async (id) => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/order/${id}`);
      setLoadedOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== id)
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  //   const handleInputChange = (e) => {
  //     setLoadedOrders((product) =>
  //       product.filter((product) => product.toString().includes(e.target.value))
  //     );
  //   };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Layout
        chilren={
          <div className="w-full h-full bg-bg-color pt-[8%]">
            <HeadingPath
              heading="Manage Orders"
              chilren={
                <React.Fragment>
                  <HeadingPathItem
                    pathname="Organic"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Orders"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Manage Orders"
                    pathnameClass="text-gray-400"
                    iconClass="hidden"
                  />
                </React.Fragment>
              }
            />

            <ManageOrderTable
              ordersData={loadedOrders}
              onDeleteOrder={handleDeleteOrder}
              //   handleInputChange={handleInputChange}
              fromItem={loadedOrders.length}
              toItem="unknown"
              totalItem={loadedOrders.length}
            />
          </div>
        }
      />
    </React.Fragment>
  );
};
export default ManageOrders;
