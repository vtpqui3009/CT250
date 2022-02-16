import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/UI/FormikControl";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Modal from "../../components/UI/Modal";
import { AuthContext } from "../../context/AuthContext";
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const validationSchema = Yup.object({
  oldPassword: Yup.string().min(8).required("This field is required."),
  newPassword: Yup.string().min(8).required("This field is required."),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref("newPassword"), ""], "Confirm password must match password")
    .required("This field is required."),
});
const PasswordChange = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const handleCloseModal = () => {
    setConfirm(false);
    setError(null);
  };
  const showPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("oldPassword", values.oldPassword);
    formData.append("newPassword", values.newPassword);
    formData.append("confirmPassword", values.confirmPassword);

    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      await axios.put(
        `${process.env.REACT_APP_BASE_API}/password/update`,
        formData
      );
      setIsLoading(false);
      navigate("/user/password-change-sucess");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      setIsLoading(false);
      setConfirm(true);
      setError(err);
    }
  };
  return (
    <React.Fragment>
      {error && confirm && (
        <Modal
          header="Incorrect Password"
          content="Please check your old and new password carefully. Then try again later."
          onCloseModal={handleCloseModal}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          {" "}
          <Navigation />
          <div className="change-password-banner">
            <p className="sub-heading-content">Change Password</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className=" w-[30%] ml-[35%] my-[5%]">
              <h1>New Credentials</h1>
              <FormikControl
                control="input"
                type={passwordShown ? "text" : "password"}
                label="Old Password *"
                name="oldPassword"
              />
              <FormikControl
                control="input"
                type={passwordShown ? "text" : "password"}
                label="New Password *"
                name="newPassword"
              />
              <FormikControl
                control="input"
                type={passwordShown ? "text" : "password"}
                label="Confirm Password *"
                name="confirmPassword"
              />
              <div className="mt-2 text-[14px] flex w-full items-center">
                <input
                  type="checkbox"
                  className="mr-2 ml-auto"
                  onClick={showPassword}
                />
                <label>Show password</label>
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default PasswordChange;
