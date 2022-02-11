import React from "react";
import { Field, ErrorMessage } from "formik";

const FormikInput = ({ label, name, errorclass, ...rest }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="block my-2 font-bold">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="border-[1px]  text-gray-700 border-gray-100 outline-none bg-gray-100 w-full p-3 hover:bg-base-color ease-linear duration-200 rounded-[2px] hover:text-white focus:bg-base-color focus:text-white"
      />
      <ErrorMessage name={name}>
        {(errorMsg) => (
          <div className="text-red-600 font-bold mt-2"> {errorMsg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};
export default FormikInput;
