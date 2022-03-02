import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../UI/FormikControl";
import { UploadMultipleImage } from "../../UI/UploadImage";
import { validationSchema } from "./FormikConfig";
import axios from "axios";
import ProductCategory from "./AddProduct/ProductCategory";
import Modal from "../../UI/Modal";
import LoadingSpinner from "../../UI/LoadingSpinner";
const options = ["Meat", "Vegetable", "Fruit"];
const UpdateProductForm = () => {
  const params = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [loadedProduct, setLoadedProduct] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    try {
      const getLoadedProduct = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/product/${params.id}`
        );
        const responseData = await response.data.product;
        setLoadedProduct(responseData);
      };
      getLoadedProduct();
    } catch (err) {}
  }, [params.id]);
  const initialValues = {
    name: loadedProduct.name,
    description: loadedProduct.description,
    price: loadedProduct.price,
    discount: loadedProduct.discount,
    stock: loadedProduct.stock,
  };

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
      setIsLoading(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/product/${params.id}`,
        formData
      );
      setIsLoading(false);
      navigate("/product/manage");
    } catch (err) {
      setIsLoading(false);
      setIsLoading(false);
      setConfirm(true);
      console.log(err);
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
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
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
                Update
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </React.Fragment>
  );
};
export default UpdateProductForm;
