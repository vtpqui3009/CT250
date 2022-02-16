import * as Yup from "yup";
export const NewBlogInitialValues = {
  title: "",
  shortDescription: "",
};
export const NewBlogValidationSchema = Yup.object({
  title: Yup.string().min(4).required("Please enter the title for your blog!"),
  shortDescription: Yup.string().required(
    "Please enter the short description for your blog!"
  ),
});
