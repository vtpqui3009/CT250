import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Modal from "../../components/UI/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/UI/FormikControl";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const initialValues = {
  token: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object({
  token: Yup.string().required("This field is required."),
  password: Yup.string().min(8).required("This field is required."),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password"), ""], "Confirm password must match password")
    .required("This field is required."),
});
const ConfirmResetToken = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const handleCloseModal = () => {
    setConfirm(false);
    setError(null);
  };
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/password/reset/${values.token}`,
        formData
      );
      const responseData = await response.data;
      console.log(responseData);
      navigate("/password/password-change-sucess");
      setLoading(false);
    } catch (err) {
      setConfirm(true);
      setError(err);
      setLoading(false);
    }
    onSubmitProps.resetForm();
  };
  const showPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleChange = (e) => {};
  return (
    <React.Fragment>
      {error && confirm && (
        <Modal
          header="Invalid Reset Token"
          content="Your reset token you entered didn't match the reset token we sent to your email. Please check and try again."
          onCloseModal={handleCloseModal}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col h-full">
          <Navigation />
          <div className="reset-token-banner">
            <p className="sub-heading-content">
              Enter your reset token you received from email to continue
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            <Form className=" form">
              <div>
                <label className="w-full block mb-6 " htmlFor="email">
                  Enter your reset token here and new credentials for your
                  account
                </label>
                <FormikControl
                  control="input"
                  type="text"
                  label="Reset Token *"
                  name="token"
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
              </div>
              <div className="flex ">
                <div className="ml-auto text-[14px] flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onClick={showPassword}
                    onChange={handleChange}
                  />
                  <label>Show password</label>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 mt-6 bg-base-color rounded text-white"
                >
                  Confirm
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
export default ConfirmResetToken;
