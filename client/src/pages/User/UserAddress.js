import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../components/UI/FormikControl";
import { addressInitialValues, addressValidationSchema } from "./FormikConfig";
import axios from "axios";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
const UserAddress = () => {
  const navigate = useNavigate();
  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    const formData = new FormData();
    formData.append("user", values.user);
    formData.append("company", values.company);
    formData.append("address", values.address);
    formData.append("phoneNumber", values.phoneNumber);
    const postUserAddress = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.post(
          `${process.env.REACT_APP_BASE_API}/address/new`,
          formData
        );
        navigate("/user/checkout");
      } catch (err) {
        console.log(err);
      }
    };
    postUserAddress();
  };
  return (
    <>
      <Navigation />
      <div className="address-page-banner">
        <p className="sub-heading-content">Your Address</p>
      </div>
      <Formik
        initialValues={addressInitialValues}
        validationSchema={addressValidationSchema}
        onSubmit={onSubmit}
      >
        <Form className="w-[60%] ml-[20%] my-[4%]">
          <FormikControl
            control="input"
            type="text"
            label="User *"
            name="user"
          />
          <FormikControl
            control="input"
            type="text"
            label="Company *"
            name="company"
          />
          <FormikControl
            control="input"
            type="text"
            label="Address *"
            name="address"
          />
          <FormikControl
            control="input"
            type="text"
            label="Phone number *"
            name="phoneNumber"
          />
          <div className="flex items-center justify-center my-2">
            <button
              type="submit"
              className="px-4 py-2 bg-base-color text-white"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>{" "}
      <Footer />
    </>
  );
};
export default UserAddress;
