import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import UpdateBlogForm from "./UpdateBlogForm";
const UpdateBlog = () => {
  return (
    <Layout
      chilren={
        <div className="w-full h-full bg-bg-color pt-[8%]">
          <HeadingPath heading="Update Blog" />
          <div className=" flex items-center justify-center">
            <UpdateBlogForm />
          </div>
        </div>
      }
    />
  );
};
export default UpdateBlog;
