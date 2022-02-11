import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../UI/FormikControl";
import { useNavigate } from "react-router-dom";
import { addressInitialValues, addressValidationSchema } from "./FormikConfig";
import axios from "axios";
const Address = () => {
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
        await axios.post("http://localhost:4000/api/v1/address/new", formData);
      } catch (err) {
        console.log(err);
      }
    };
    postUserAddress();
    navigate("/user/order-success");
    localStorage.removeItem("cartItems");
  };
  return (
    <Formik
      initialValues={addressInitialValues}
      validationSchema={addressValidationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form">
        <FormikControl control="input" type="text" label="User *" name="user" />
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

        <div className="flex items-center justify-center mt-4">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default Address;
