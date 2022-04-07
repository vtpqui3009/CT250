import React, { useState } from "react";
import { UploadImage } from "../UI/Form/UploadImage";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../UI/Form/FormikControl";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  registrationInitialValues,
  registrationValidationSchema,
} from "./FormikConfig";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
const RegisterForm = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleChange = (e) => {};
  const onSubmit = (values, onSubmitProps) => {
    const registerAccount = async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", selectedImage);
      const email = values.email;
      const password = values.password;

      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API}/register`,
          formData
        );
        if (response) {
          login(dispatch, { email, password });
        }
        setIsLoading(false);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
      }
    };
    registerAccount();
    onSubmitProps.resetForm();
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={registrationInitialValues}
        validationSchema={registrationValidationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form">
          <header className="text-2xl font-bold text-center">
            <h1>Register</h1>
          </header>
          <div className="mb-6">
            {" "}
            <UploadImage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
          <FormikControl
            control="input"
            type="text"
            label="Name *"
            name="name"
          />
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
            <div className=" text-[14px]">
              <Link to="/password/send-email">Forgot password?</Link>
            </div>
            <div className="ml-auto text-[14px] mr-2">
              <input
                type="checkbox"
                className="mr-2"
                onClick={showPassword}
                onChange={handleChange}
              />
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
      </Formik>{" "}
    </>
  );
};
export default RegisterForm;
