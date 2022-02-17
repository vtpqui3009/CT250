import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../../UI/FormikControl";
import ProductCategory from "./ProductCategory";
import axios from "axios";
import { initialValues, validationSchema } from "../FormikConfig";
import { UploadMultipleImage } from "../../../UI/UploadImage";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import Modal from "../../../UI/Modal";
const options = ["Fruit", "Vegetable", "Meat"];
const AddProductForm = (props) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("category", values.category);
    formData.append("stock", values.stock);
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      await axios.post(
        `  ${process.env.REACT_APP_BASE_API}/admin/product/new`,
        formData
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
    navigate("/product/manage");
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="content">
          <FormikControl
            className="form-control"
            errorclass="error-message"
            label="Name"
            type="text"
            id="name"
            name="name"
          />
          <FormikControl
            as="textarea"
            className="form-control"
            errorclass="error-message"
            label="Desciption"
            type="text"
            id="description"
            name="description"
          />
          <FormikControl
            className="form-control"
            errorclass="error-message"
            label="Price"
            type="number"
            id="price"
            name="price"
          />
          <FormikControl
            className="form-control"
            errorclass="error-message"
            label="Discount"
            type="number"
            id="discount"
            name="discount"
          />
          <UploadMultipleImage
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
          <ProductCategory
            options={options}
            defaultOption="Select an category"
          />
          <FormikControl
            className="form-control"
            errorclass="error-message"
            label="Stock"
            type="number"
            id="stock"
            name="stock"
          />
          <div className="flex items-center justify-center">
            <button className="add-product__button" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
};
export default AddProductForm;
