import * as Yup from "yup";
export const registrationInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registrationValidationSchema = Yup.object({
  name: Yup.string().required("Name must not be empty!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required."),
  password: Yup.string().min(8).required("This field is required."),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password"), ""], "Confirm password must match password")
    .required("This field is required."),
});
export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required."),
  password: Yup.string().min(8).required("This field is required."),
});
