import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../components/UI/FormikControl";
import * as Yup from "yup";
import axios from "axios";
import { useQuill } from "react-quilljs";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import "quill/dist/quill.snow.css";
const UpdateBlogForm = () => {
  const params = useParams();
  const [content, setContent] = useState("");
  const { quill, quillRef } = useQuill();
  const [loadedBlog, setLoadedBlog] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    try {
      const getLoadedBlog = async () => {
        const response = await axios.get(
          `http://localhost:4000/api/v1/blog/${params.bid}`
        );
        const responseData = await response.data.blog;
        setLoadedBlog(responseData);
        setContent(responseData.content);
      };
      getLoadedBlog();
    } catch (err) {}
  }, [params.bid]);
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(content);
      quill.on("text-change", () => {
        setContent(quill.getText());
      });
    }
  }, [quill, content]);
  const initialValues = {
    title: loadedBlog.title,
    shortDescription: loadedBlog.shortDescription,
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(4)
      .required("Please enter the title for your blog!"),
    shortDescription: Yup.string().required(
      "Please enter the short description for your blog!"
    ),
  });

  const handleSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("shortDescription", values.shortDescription);
    formData.append("content", content);
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:4000/api/v1/blog/${params.bid}`,
        formData
      );
      setIsLoading(false);
      navigate("/blog/manage");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
    <React.Fragment>
      {error && confirm && (
        <Modal
          header="Organic Dashboard"
          content="An error occured, please check your data carefully. Then try again later."
          onCloseModal={handleCloseModal}
        />
      )}{" "}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="px-[8%] h-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
export default UpdateBlogForm;
