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
    <div className="w-[90%] ml-[5%] my-[5%]">
      <h1 className="heading font-playfair">The Blog</h1>
      <ul className="grid grid-cols-3 h-[300px] gap-[5%]">
        {loadedBlog &&
          loadedBlog.map((blog) => {
            return (
              <li key={blog._id}>
                <Link
                  to={`/blog/${blog._id}`}
                  className="w-full h-full object-cover"
                >
                  <img
                    src={blog.image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Link>
                <Link to={`/blog/${blog._id}`}>
                  <div className="font-playfair text-[18px] mb-4">
                    {blog.title}
                  </div>
                  <div className="flex items-center justify-between text-gray-600 mb-4">
                    <div className="flex items-center ">
                      {new Date(blog.createdAt).toLocaleString()}
                    </div>
                    <div className="flex items-center ">
                      {blog.numOfComment}
                      <UilComment className="w-[16px] h-[16px] ml-2" />
                    </div>
                  </div>
                  <p className="blog-description">{blog.shortDescription}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Blog;
