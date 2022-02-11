import * as Yup from "yup";
export const initialValues = {
  name: "",
  description: "",
  price: 0,
  discount: 0,
  category: "",
  stock: 0,
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Product name must not be empty!"),
  description: Yup.string().required("Product description must not be empty!"),
  price: Yup.number().min(5000),
  // image: Yup.mixed().required("Please choose an image for this product!"),
  category: Yup.string().required("Please choose a category for this product!"),
  stock: Yup.number().min(10).max(1000),
});
