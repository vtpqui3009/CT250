import { Field } from "formik";
const ProductCategory = ({ options, defaultOption }) => {
  return (
    <div className="form-control">
      <label>Category</label>
      <Field as="select" name="category" id="category">
        <option>{defaultOption}</option>
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Field>
    </div>
  );
};
export default ProductCategory;
