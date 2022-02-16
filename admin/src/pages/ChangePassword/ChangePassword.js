import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/UI/FormikControl";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Modal from "../../components/UI/Modal";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";

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
const ChangePassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
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
      await axios.put("http://localhost:4000/api/v1/password/update", formData);
      setIsLoading(false);
      navigate("/change-password-success");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      setIsLoading(false);
      setConfirm(true);
      setError(err);
      setPasswordShown(false);
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
          <Layout
            chilren={
              <div className="w-full h-screen bg-bg-color pt-[8%]">
                <HeadingPath heading="New Credential" />
                <div className="px-[8%] ">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <FormikControl
                        className="form-control"
                        errorclass="error-message"
                        label="Old Password"
                        type={passwordShown ? "text" : "password"}
                        id="oldPassword"
                        name="oldPassword"
                      />
                      <FormikControl
                        className="form-control"
                        errorclass="error-message"
                        label="New Password"
                        type={passwordShown ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                      />
                      <FormikControl
                        className="form-control"
                        errorclass="error-message"
                        label="Confirm Password"
                        type={passwordShown ? "text" : "password"}
                        id="confirmPassword"
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
                          className="px-6 py-2 mt-6 bg-sidebar-color rounded text-white text-[14px]"
                        >
                          Confirm
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            }
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default ChangePassword;
