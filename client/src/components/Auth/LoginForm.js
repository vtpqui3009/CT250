import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../UI/Form/FormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginInitialValues, loginValidationSchema } from "./FormikConfig";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleChange = (e) => {};
  const handleCloseModal = () => {
    setConfirm(false);
  };
  const onSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const email = values.email;
    const password = values.password;
    const loginAccount = async () => {
      axios.defaults.withCredentials = true;
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API}/login`,
          formData
        );
        if (response) {
          login(dispatch, { email, password });
        }
        setIsLoading(false);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        setConfirm(true);
        setLoginError(true);
      }
    };
    loginAccount();
    onSubmitProps.resetForm();
  };
  return (
    <React.Fragment>
      {" "}
      {isLoading && <LoadingSpinner />}
      {loginError && confirm && (
        <Modal
          header="Invalid Credentials"
          content="Your email and password you entered didn't match data you registered in our system. Please check and try again."
          onCloseModal={handleCloseModal}
        />
      )}
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form">
          <header className="text-2xl font-bold text-center">
            <h1>Login</h1>
          </header>
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
          <div className="my-4 flex items-center w-full">
            <div className=" text-[14px]">
              <Link to="/password/send-email">Forgot password?</Link>
            </div>
            <div className="ml-auto text-[14px]">
              <input
                type="checkbox"
                className="mr-2"
                onClick={showPassword}
                onChange={handleChange}
              />
              <label>Show password</label>
            </div>
          </div>
          <Link to="/register">
            <div className="text-center m-2 text-[14px] cursor-pointer">
              Don't have an account ? Sign up now{" "}
            </div>
          </Link>
          <div className="flex items-center justify-center mt-4">
            <button type="submit" className="auth-button">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
};
export default LoginForm;
