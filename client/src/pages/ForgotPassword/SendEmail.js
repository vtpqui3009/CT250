import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Modal from "../../components/UI/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import FormikControl from "../../components/UI/FormikControl";
const initialValues = {
  email: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required."),
});
const SendEmail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Quên mật khẩu";
  }, []);
  const handleCloseModal = () => {
    setConfirm(false);
    setError(null);
  };
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const formData = new FormData();
      formData.append("email", values.email);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/password/forgot`,
        formData
      );
      const responseData = await response.data;
      navigate("/password/reset-token");
      setLoading(false);
      console.log(responseData);
    } catch (err) {
      setLoading(false);
      setConfirm(true);
      setError(err);
    }
  };
  return (
    <React.Fragment>
      {error && confirm && (
        <Modal
          header="Invalid Email"
          content="Your email you entered didn't match your email you registered in our system. Please check and try again."
          onCloseModal={handleCloseModal}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col h-full">
          <Navigation />
          <div className="forgot-password-banner">
            <p className="sub-heading-content">Password Forgot</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="form">
              <div>
                <h2 className="font-bold">Forgot your password</h2>
                <label className="w-full block my-2" htmlFor="email">
                  Enter your email to get the password reset token
                </label>
                <FormikControl
                  control="input"
                  type="email"
                  label="Email *"
                  name="email"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 mt-6 bg-base-color rounded text-white"
                >
                  Next
                </button>
              </div>
            </Form>
          </Formik>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
};
export default SendEmail;
