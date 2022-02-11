import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import CustomerTable from "../../components/Content/Customer/CustomerTable";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const ManageCustomer = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getLoadedUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          "http://localhost:4000/api/v1/admin/users"
        );
        const responseData = await response.data.users;
        const filterData = responseData.filter((data) => data.role === "user");
        setLoadedUsers(filterData);
      } catch (err) {}
    };
    getLoadedUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    console.log(id);
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`);
      setLoadedUsers((users) => users.filter((user) => user._id !== id));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      <Layout
        chilren={
          <div className="w-full h-full bg-bg-color pt-[8%]">
            <HeadingPath
              heading="Manage Customer"
              chilren={
                <>
                  <HeadingPathItem
                    pathname="Organic"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Manage customer"
                    pathnameClass="text-gray-400"
                    iconClass="hidden"
                  />
                </>
              }
            />
            <div>
              <CustomerTable
                customerData={loadedUsers}
                onClick={handleDeleteUser}
              />
            </div>
          </div>
        }
      />{" "}
    </React.Fragment>
  );
};
export default ManageCustomer;
