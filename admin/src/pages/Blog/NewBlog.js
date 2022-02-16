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
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
const NewBlog = () => {
  const { quill, quillRef } = useQuill();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.getText());
      });
    }
  }, [quill]);
  const handleCloseModal = () => {
    setConfirm(false);
    setError(null);
  };

  const handleSubmit = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("shortDescription", values.shortDescription);
    formData.append("image", selectedImage);
    formData.append("content", content);
    const createNewBlog = async () => {
      axios.defaults.withCredentials = true;
      try {
        setIsLoading(true);
        await axios.post("http://localhost:4000/api/v1/blog/new", formData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setConfirm(true);
        setError(err);
        console.log(err);
      }
    };
    createNewBlog();
    navigate("/blog/manage");
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
                      <div className="form-control">
                        <label>Content</label>
                        <div className="quill-container">
                          <div ref={quillRef} />
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
