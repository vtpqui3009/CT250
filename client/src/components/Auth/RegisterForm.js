import React, { useState } from "react";
import { UploadImage } from "../UI/UploadImage";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../UI/FormikControl";
import axios from "axios";
import {
  registrationInitialValues,
  registrationValidationSchema,
} from "./FormikConfig";
const RegisterForm = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const showPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const onSubmit = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", selectedImage);
    const registerAccount = async () => {
      try {
        axios.defaults.withCredentials = true;
        axios.post(`${process.env.REACT_APP_BASE_API}/register`, formData);
      } catch (err) {
        console.log(err);
      }
      onSubmitProps.resetForm();
    };
    registerAccount();
  };
  return (
    <Formik
      initialValues={registrationInitialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form">
        <header className="text-2xl font-bold text-center">
          <h1>Register</h1>
        </header>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <FormikControl control="input" type="text" label="Name *" name="name" />
        <FormikControl
          control="input"
          type="email"
          label="Email *"
          name="email"
        />
        <FormikControl
          control="input"
          type={passwordShown ? "text" : "password"}
          label="Password *"
          name="password"
        />
        <FormikControl
          control="input"
          type={passwordShown ? "text" : "password"}
          label="Confirm Password *"
          name="confirmPassword"
        />
        <div className="m-2 flex items-center w-full">
          <div className="ml-auto text-[14px]">
            <input type="checkbox" className="mr-2" onClick={showPassword} />
            <label>Show password</label>
          </div>
        </div>
        <Link to="/login">
          <div
            onClick={props.switchMode}
            className="text-center m-2 text-[14px] cursor-pointer"
          >
            Already have an account ? Sign in now{" "}
          </div>
        </Link>
        <div className="flex items-center justify-center mt-4">
          <button type="submit" className="auth-button">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default RegisterForm;
