import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import FormikControl from "../UI/FormikControl";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../UI/Modal";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("This field is required!"),
  password: Yup.string().min(8).max(16).required("This field is required!"),
});
const Auth = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const onSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    axios.defaults.withCredentials = "true";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/login`,
        formData
      );
      const responseData = response.data;
      if (responseData.user.role === "admin") {
        dispatch({
          type: "LOGIN",
          payload: responseData,
        });
      } else {
        alert("You account don't have permission to access this page.");
      }
    } catch (err) {
      setConfirm(true);
      setError(err);
    }
    onSubmitProps.resetForm();
  };
  const handleCloseModal = () => {
    setConfirm(false);
    setError(null);
  };
  return (
    <>
      {error && confirm && (
        <Modal
          header="Authentication Failed!"
          content="Please check your email and password and try again!"
          onCloseModal={handleCloseModal}
        />
      )}
      <div className="auth">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="auth-form">
            <h1 className="text-center font-semibold text-xl uppercase">
              Welcome you back!
            </h1>
            <FormikControl
              className="auth-form-control"
              errorclass="auth-error"
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
            <FormikControl
              className="auth-form-control"
              errorclass="auth-error"
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="on"
            />
            <div className="flex items-center my-2 ">
              <input type="checkbox" />
              <label className="ml-2 text-[14px] font-semibold">
                Remember me
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="auth-submit-button">
                Submit
              </button>
            </div>
            <div className="text-center text-[14px]">Forgot Password?</div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default Auth;
