import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import FormikControl from "../UI/FormikControl";
import * as Yup from "yup";
import { CameraIcon } from "@heroicons/react/outline";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [loadedInfo, setLoadedInfo] = useState({});
  const [loadedAvatar, setLoadedAvatar] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLoadedInfo = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/me`
        );
        const responseData = await response.data.user;
        setLoadedInfo(responseData);
        setLoadedAvatar(responseData.avatar.url);
      } catch (err) {}
    };
    fetchLoadedInfo();
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLoadedAvatar(reader.result);
    };
  };
  const initialValues = {
    name: loadedInfo.name,
    email: loadedInfo.email,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("This field is required!"),
    email: Yup.string()
      .email("Invalid email format!")
      .required("This field is required!"),
  });
  const onSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("avatar", loadedAvatar);
    formData.append("name", values.name);
    formData.append("email", values.email);
    try {
      setLoading(true);
      await axios.put(`${process.env.REACT_APP_BASE_API}/me/update`, formData);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setError(false);
  };
  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      {!error && modalVisible && (
        <Modal
          header="Error Message"
          content="Something went wrong. Please check your data and try again!"
          onCloseModal={handleCloseModal}
        />
      )}
      {loadedInfo && (
        <div className="w-[90%] ml-[5%] pt-10 mt-[5%]">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form className="content mt-6">
              <div className="relative flex items-center justify-center">
                <img
                  alt=""
                  src={loadedAvatar && loadedAvatar}
                  className="w-[50px] h-[50px] rounded-full object-cover relative"
                />
                <label htmlFor="images">
                  <CameraIcon
                    size="16"
                    className="absolute bottom-[6px] left-[50%] rounded-full cursor-pointer font-extrabold w-[16px] h-[16px] text-gray-700 bg-gray-200 px-[2px]"
                  />
                </label>
                <input
                  type="file"
                  id="images"
                  onChange={handleImageChange}
                  hidden
                />
              </div>
              <FormikControl
                className="form-control"
                errorclass="error-message"
                label="Name"
                type="text"
                id="name"
                name="name"
              />
              <FormikControl
                className="form-control"
                errorclass="error-message"
                label="Email "
                type="email"
                id="email"
                name="email"
              />
              <div className="flex items-center justify-center">
                <button className="add-product__button" type="submit">
                  Update
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </React.Fragment>
  );
};
export default Profile;
