import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import ManageBlogTable from "./ManageBlogTable";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const ManageProduct = () => {
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [filterBlogs, setFilterBlogs] = useState("");
  // const [searchProducts, setSearchProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `         ${process.env.REACT_APP_BASE_API}/blogs?page=1`
        );
        const responseData = await response.data.blogs;
        console.log(responseData);
        const filterData = responseData.slice(0, 5);
        setLoadedBlogs(filterData);
        setFilterBlogs(filterData.length);
        setIsLoading(false);
        console.log(responseData);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getLoadedProduct();
  }, []);
  const handleDeleteBlog = async (id) => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_BASE_API}blog/${id}`);
      setLoadedBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== id)
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    setLoadedBlogs((blog) =>
      blog.filter((blog) => blog.toString().includes(e.target.value))
    );
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Layout
        chilren={
          <div className="w-full h-full bg-bg-color pt-[8%]">
            <HeadingPath
              heading="Manage Blog"
              chilren={
                <React.Fragment>
                  <HeadingPathItem
                    pathname="Organic"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Blog"
                    pathnameClass="text-gray-900"
                  />
                  <HeadingPathItem
                    pathname="Manage Blog"
                    pathnameClass="text-gray-400"
                    iconClass="hidden"
                  />
                </React.Fragment>
              }
            />

            <ManageBlogTable
              blogData={loadedBlogs}
              onDeleteBlog={handleDeleteBlog}
              handleInputChange={handleInputChange}
              fromItem={filterBlogs.length}
              toItem="unknown"
              totalItem={loadedBlogs.length}
            />
          </div>
        }
      />
    </React.Fragment>
  );
};
export default ManageProduct;
