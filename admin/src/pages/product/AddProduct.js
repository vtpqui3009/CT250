import Layout from "../../components/Layout";
import AddProductForm from "../../components/Content/Product/AddProduct/AddProductForm";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";

const AddProduct = () => {
  return (
    <Layout
      chilren={
        <div className="w-full h-full bg-bg-color pt-[8%]">
          <HeadingPath
            heading="Product Form"
            chilren={
              <>
                <HeadingPathItem
                  pathname="Organic"
                  pathnameClass="text-gray-900"
                />
                <HeadingPathItem
                  pathname="Product"
                  pathnameClass="text-gray-900"
                />
                <HeadingPathItem
                  pathname="Add Product"
                  pathnameClass="text-gray-400"
                  iconClass="hidden"
                />
              </>
            }
          />
          <div className=" flex items-center justify-center">
            <AddProductForm />
          </div>
        </div>
      }
    />
  );
};
export default AddProduct;
