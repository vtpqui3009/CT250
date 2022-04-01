import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UilComment } from "@iconscout/react-unicons";

const BlogDetail = () => {
  const params = useParams();
  const [loadedBlog, setLoadedBlog] = useState({});
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/blog/${params.bid}`
        );
        const responseData = await response.data.blog;
        document.title = responseData.title;
        console.log(responseData);
        setLoadedBlog(responseData);
      } catch (err) {}
    };
    fetchDetailProduct();
  }, [params.bid]);
  useEffect(() => {
    const fetchAuthor = async () => {
      axios.defaults.withCredentials = true;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/user/${loadedBlog.author}`
        );
        const responseData = await response.data;
        console.log(responseData);
      } catch (err) {}
    };
    loadedBlog && fetchAuthor();
  }, [loadedBlog]);
  return (
    <>
      <Navigation />
      <div className="blog-detail-banner">
        <p className="sub-heading-content">Blog Detail</p>
      </div>
      <main className="w-[90%] ml-[5%] my-24">
        {loadedBlog && (
          <section>
            <p className="text-[24px] my-5 font-playfair">{loadedBlog.title}</p>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center ">
                {new Date(loadedBlog.createdAt).toLocaleString()}
              </div>
              <div className="flex items-center ">
                {loadedBlog.numOfComment}
                <UilComment className="w-[16px] h-[16px] ml-2" />
              </div>
            </div>
            {/* <img
              src={loadedImage}
              alt=""
              className="w-full object-cover bg-cover my-5"
            /> */}
            <p className="my-5">{loadedBlog.shortDescription}</p>
            <p
              className="my-5"
              dangerouslySetInnerHTML={{ __html: loadedBlog.content }}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
export default BlogDetail;
