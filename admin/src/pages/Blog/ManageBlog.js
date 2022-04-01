import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import ManageBlogTable from "./ManageBlogTable";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const ManageProduct = () => {
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [selectValue, setSelectValue] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [queryBlog, setQueryBlog] = useState(null);
  useEffect(() => {
    const getLoadedProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/blogs/all`
        );
        const responseData = await response.data.blogs;
        setLoadedBlogs(responseData);
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
      await axios.delete(`${process.env.REACT_APP_BASE_API}/blog/${id}`);
      setLoadedBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== id)
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    const getLoadedProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/blogs/all`
        );
        const responseData = await response.data.blogs;
        setQueryBlog(responseData.filter((data) => data.title.includes(query)));
      } catch (err) {}
    };
    const timoutId = setTimeout(() => {
      getLoadedProduct();
    }, 500);
    return () => {
      clearTimeout(timoutId);
    };
  }, [query]);
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Layout
        chilren={
          <div className="w-full h-full bg-bg-color pt-[8%] overflow-hidden">
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
            {!query ? (
              <ManageBlogTable
                blogData={loadedBlogs.slice(0, selectValue)}
                onDeleteBlog={handleDeleteBlog}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                toItem="unknown"
                totalItem={loadedBlogs.length}
              />
            ) : (
              <ManageBlogTable
                blogData={queryBlog}
                onDeleteBlog={handleDeleteBlog}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                toItem="unknown"
                totalItem={loadedBlogs.length}
              />
            )}
          </div>
        }
      />
    </React.Fragment>
  );
};
export default ManageProduct;
