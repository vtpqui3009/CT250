import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import UpdateCustomerForm from "../../components/Content/Customer/UpdateCustomerForm";
const UpdateCustomer = () => {
  return (
    <Layout
      chilren={
        <div className="w-full h-full bg-bg-color pt-[8%]">
          <HeadingPath heading="Update Customer Form" />
          <div className=" flex items-center justify-center">
            <UpdateCustomerForm />
          </div>
        </div>
      }
    />
  );
};
export default UpdateCustomer;
