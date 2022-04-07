import FormikInput from "./FormikInput";
const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <FormikInput {...rest} />;
    case "textarea":
    case "select":
    case "radio":
    case "checkbox":
    case "date":
    default:
      return null;
  }
};
export default FormikControl;
