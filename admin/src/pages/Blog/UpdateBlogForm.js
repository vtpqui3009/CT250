import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../components/UI/FormikControl";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
const UpdateBlogForm = () => {
  const params = useParams();
  const [content, setContent] = useState("");
  const [loadedBlog, setLoadedBlog] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [ckeditorContentData, setCkeditorContentData] = useState("");
  const inputCKEditorContentHandler = (event, editor) => {
    setCkeditorContentData(editor.getData());
  };
  useEffect(() => {
    try {
      const getLoadedBlog = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/blog/${params.bid}`
        );
        const responseData = await response.data.blog;
        setLoadedBlog(responseData);
        setContent(responseData.content);
      };
      getLoadedBlog();
    } catch (err) {}
  }, [params.bid]);

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
    formData.append("content", ckeditorContentData);
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_API}/blog/${params.bid}`,
        formData
      );
      setIsLoading(false);
      toast.success(`🦄 Cập nhật bài viết thành công!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
              <div className="flex items-center w-full p-6">
                <label className="w-[15%] mr-4 font-bold text-[12px]">
                  Content
                </label>
                <div className="w-[85%] text-[12px]">
                  <CKEditor
                    // value={ckeditorContentData}
                    data={content}
                    editor={ClassicEditor}
                    id="content"
                    onChange={inputCKEditorContentHandler}
                  />
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
