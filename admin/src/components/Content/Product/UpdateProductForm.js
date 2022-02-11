import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../UI/FormikControl";
import { UploadMultipleImage } from "../../UI/UploadImage";
import { validationSchema } from "./FormikConfig";
import axios from "axios";
import ProductCategory from "./AddProduct/ProductCategory";
const options = ["Meat", "Vegetable", "Fruit"];
const UpdateProductForm = () => {
  const params = useParams();
  const [selectedImages, setSelectedImages] = useState([]);

  const [loadedProduct, setLoadedProduct] = useState({});
  console.log(params.id);
  useEffect(() => {
    try {
      const getLoadedProduct = async () => {
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/${params.id}`
        );
        const responseData = await response.data.product;
        setLoadedProduct(responseData);
        setSelectedImages(responseData.images);
      };
      getLoadedProduct();
    } catch (err) {}
  }, [params.id]);
  console.log(selectedImages);
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
      await axios.post(
        "http://localhost:4000/api/v1/admin/product/new",
        formData
      );
    } catch (err) {
      console.log(err);
    }
    onSubmitProps.resetForm();
  };
  const loadedSelectedImages = selectedImages.map((image, index) => image.url);
  return (
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
        <UploadMultipleImage selectedImages={loadedSelectedImages} />

        <ProductCategory
          defaultOption={loadedProduct.category}
          options={options}
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
  );
};
export default UpdateProductForm;
