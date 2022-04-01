import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilComment } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
const Blog = () => {
  const [loadedBlog, setLoadedBlog] = useState([]);
  useEffect(() => {
    const fetchLoadedBlog = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/blogs?pages=1`
      );
      const responseData = await response.data.blogs;
      const filterBlogs = responseData.slice(0, 3);
      setLoadedBlog(filterBlogs);
    };
    fetchLoadedBlog();
  }, []);
  return (
    <div className="w-[90%] ml-[5%] mb-[12%] mt-[5%]">
      <h1 className="heading font-playfair">The Blog</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 h-[200px] gap-[5%] blog mb-[15%] sm:mb-[8%] lg:mb-0 ">
        {loadedBlog &&
          loadedBlog.map((blog) => {
            return (
              <li key={blog._id} className="h-full md:mb-0 mb-[10%]">
                <Link to={`/blog/${blog._id}`} className="w-full  object-cover">
                  <img
                    src={blog.image.url}
                    alt=""
                    className="w-full h-[250px] object-cover bg-cover"
                  />
                </Link>
                <Link to={`/blog/${blog._id}`}>
                  <div className="mb-4 mt-4">{blog.title}</div>
                </Link>
                <div className="flex items-center justify-between text-gray-600 mb-4">
                  <div className="flex items-center ">
                    {new Date(blog.createdAt).toLocaleString()}
                  </div>
                  <div className="flex items-center ">
                    {blog.numOfComment}
                    <UilComment className="w-[16px] h-[16px] ml-2" />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Blog;
