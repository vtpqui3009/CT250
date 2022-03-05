import React, { useState, useEffect } from "react";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Formik, Form } from "formik";
import FormikControl from "../../components/UI/FormikControl";
import * as Yup from "yup";
import { CameraIcon } from "@heroicons/react/outline";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const [loadedInfo, setLoadedInfo] = useState({});
  const [loadedAvatar, setLoadedAvatar] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLoadedInfo = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/me`
        );
        const responseData = await response.data.user;
        console.log(responseData);
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
  const initialValues = { name: loadedInfo.name, email: loadedInfo.email };

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
      //   setError(true);
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Navigation />
          {loadedInfo && (
            <div className="w-[90%] ml-[5%] pt-10 mt-[1%]">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                <Form className="content mt-6 w-4/5 ml-[10%]">
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

                  <div className="flex items-center justify-center">
                    <button
                      className="px-4 py-2 bg-base-color text-white my-4"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default UserProfile;
