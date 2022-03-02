import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../components/UI/FormikControl";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Modal from "../../components/UI/Modal";
import Layout from "../../components/Layout";
import HeadingPath from "../../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../../components/Content/HeadingPath/HeadingPathItem";
import {
  NewBlogInitialValues,
  NewBlogValidationSchema,
} from "./FormikConstants";
import { UploadSingleImage } from "../../components/UI/UploadImage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const NewBlog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [ckeditorContentData, setCkeditorContentData] = useState("");
  const handleCloseModal = () => {
    setConfirm(false);
    setError(null);
  };

  const handleSubmit = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("shortDescription", values.shortDescription);
    formData.append("image", selectedImage);
    formData.append("content", ckeditorContentData);
    const createNewBlog = async () => {
      axios.defaults.withCredentials = true;
      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.REACT_APP_BASE_API}/blog/new`,
          formData
        );
        setIsLoading(false);
        navigate("/blog/manage");
      } catch (err) {
        setIsLoading(false);
        setConfirm(true);
        setError(err);
        console.log(err);
      }
    };
    createNewBlog();
  };
  const inputCKEditorContentHandler = (event, editor) => {
    setCkeditorContentData(editor.getData());
  };
  return (
    <React.Fragment>
      {error && confirm && (
        <Modal
          header="Organic Dashboard"
          content="An error occured, please check your data carefully. Then try again later."
          onCloseModal={handleCloseModal}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <Layout
            chilren={
              <div className="w-full h-full bg-bg-color pt-[8%]">
                <HeadingPath
                  heading="Create Blog"
                  chilren={
                    <>
                      <HeadingPathItem
                        pathname="Organic"
                        pathnameClass="text-gray-900"
                      />
                      <HeadingPathItem
                        pathname="Blog"
                        pathnameClass="text-gray-900"
                      />
                      <HeadingPathItem
                        pathname="Create Blog"
                        pathnameClass="text-gray-400"
                        iconClass="hidden"
                      />
                    </>
                  }
                />
                <div className="px-[8%] h-full">
                  <Formik
                    initialValues={NewBlogInitialValues}
                    validationSchema={NewBlogValidationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <FormikControl
                        className="form-control"
                        errorclass="error-message"
                        label="Title"
                        type="text"
                        id="title"
                        name="title"
                      />
                      <FormikControl
                        as="textarea"
                        className="form-control h-[80px]"
                        errorclass="error-message"
                        label="Short Description"
                        type="text"
                        id="shortDescription"
                        name="shortDescription"
                      />
                      <UploadSingleImage
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                      />
                      <div className="flex items-center w-full p-6">
                        <label className="w-[15%] mr-4 font-bold text-[12px]">
                          Content
                        </label>
                        <div className="w-[85%] text-[12px]">
                          <CKEditor
                            value={ckeditorContentData}
                            editor={ClassicEditor}
                            id="content"
                            onChange={inputCKEditorContentHandler}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          type="submit"
                          className="px-6 py-2 mt-16 bg-sidebar-color rounded text-white text-[14px]"
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
export default NewBlog;
