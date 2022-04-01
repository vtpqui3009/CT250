import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const AllBlog = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/blogs?pages=1`
        );
        const responseData = await response.data.blogs;
        document.title = "Tất cả bài blog";
        setAllBlog(responseData);
        console.log(responseData);
        setIsLoading(false);
      } catch (err) {}
    };
    fetchAllBlog();
  }, []);
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Navigation />
          <div className="my-6">
            <h1 className="w-[80%] ml-[10%] gap-[2%] font-bold my-6 text-xl">
              All Blog
            </h1>
            {allBlog.length === 0 && (
              <div className="text-center my-6">
                No blog updated yet. Please come back later.
              </div>
            )}
            <div className="grid grid-cols-4 w-[80%] ml-[10%] gap-10">
              {allBlog &&
                allBlog.map((blog) => (
                  <div key={blog._id}>
                    <Link to={`/blog/${blog._id}`}>
                      <img
                        src={blog.image.url}
                        alt=""
                        className="w-full h-[200px] object-cover bg-cover"
                      />
                    </Link>

                    <div className="text-center">
                      <Link to={`/blog/${blog._id}`}>
                        {" "}
                        <div>{blog.title}</div>{" "}
                      </Link>
                      {/* <div>{blog.shortDescription}</div> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default AllBlog;
