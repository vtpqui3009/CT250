import * as Yup from "yup";

export const addressInitialValues = {
  user: "",
  company: "",
  address: "",
  phoneNumber: "",
};
export const addressValidationSchema = Yup.object({
  user: Yup.string().required("This field is required."),
  company: Yup.string().required("This field is required."),
  address: Yup.string().required("This field is required."),
  phoneNumber: Yup.number().required("This field is required."),
});
