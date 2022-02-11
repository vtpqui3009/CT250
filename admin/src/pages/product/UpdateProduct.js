import Layout from "../../components/Layout";
import UpdateProductForm from "../../components/Content/Product/UpdateProductForm";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";

const AddProduct = () => {
  return (
    <Layout
      chilren={
        <div className="w-full h-full bg-bg-color pt-[8%]">
          <HeadingPath heading="Update Product Form" />
          <div className=" flex items-center justify-center">
            <UpdateProductForm />
          </div>
        </div>
      }
    />
  );
};
export default AddProduct;
