import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "../UI/FormikControl";
import { useNavigate } from "react-router-dom";
import { addressInitialValues, addressValidationSchema } from "./FormikConfig";
import axios from "axios";
import { Link } from "react-router-dom";
import StripCheckout from "react-stripe-checkout";

const KEY =
  "pk_test_51KRqpcL6Cna0WfUDsuGJ8ATwrGpVZszhBy6A56z0VNDHrhxshIAVUG02KeaHIBt7nBbNdAr7BmIzxRNffxU9WXlV00MMxIKhJi";

const CheckOut = () => {
  const navigate = useNavigate();
  const [product] = useState({
    name: "Sample Book",
    price: 1,
    description: "This is a sample book",
  });
  const items =
    localStorage.getItem("cartItems") &&
    JSON.parse(localStorage.getItem("cartItems"));
  console.log(items);
  // const [product] = useState ()
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
      } catch (err) {
        console.log(err);
      }
    };
    postUserAddress();
    navigate("/user/order-success");
  };
  async function handleToken(token, addresses) {
    const response = await axios.post("http://localhost:4000/checkout", {
      token,
      product,
    });
    const { status } = response.data;
    console.log("Response:", response.data);
  }
  console.log(items.length);
  return (
    <div className="flex w-full py-[5%] px-[10%] gap-[2%]">
      <Formik
        initialValues={addressInitialValues}
        validationSchema={addressValidationSchema}
        onSubmit={onSubmit}
      >
        <Form className="w-1/2">
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
          {/* 
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-1 rounded border-[1px] border-base-color hover:bg-base-input hover:text-white hover:bg-base-color"
            >
              Submit
            </button>
          </div> */}
        </Form>
      </Formik>
      <div className="w-1/2">
        <h1>Order ({items.length} Product) </h1>
        {items &&
          items?.map((product, index) => (
            <div key={index}>
              <div className="flex items-center">
                <img
                  alt=" "
                  src={product.product.images[0].url}
                  className="w-[100px] h-[100px]"
                />
                <div className="flex flex-col ml-4">
                  <div>
                    <span>Price : </span>
                    <span>{product.product.price}</span>
                  </div>
                  <div>
                    <span>Quantity : </span>
                    <span>{product.cartQuantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div>Total</div>
        <div className="flex items-center">
          <Link to="/cart">Return your cart</Link>
          <StripCheckout
            name="Organic Shop"
            image="https://res.cloudinary.com/datejdygy/image/upload/v1645068637/samples/weblogo_kxmm8q.png"
            billingAddress
            shippingAddress
            description="Your total is ..."
            amount={1}
            token={handleToken}
            stripeKey={KEY}
          >
            <button className="ml-4 rounded bg-base-color text-white px-4 py-1 ">
              Order Now
            </button>
          </StripCheckout>
        </div>
      </div>
    </div>
  );
};
export default CheckOut;
