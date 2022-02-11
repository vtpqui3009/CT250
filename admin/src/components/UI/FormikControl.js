import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
const FormikControl = (props) => {
  return (
    <Fragment>
      <div className={props.className}>
        <label htmlFor={props.id}>{props.label}</label>
        <Field id={props.id} type={props.type} name={props.name} {...props} />
      </div>
      <ErrorMessage name={props.name}>
        {(errorMsg) => <div className={props.errorclass}> {errorMsg}</div>}
      </ErrorMessage>
    </Fragment>
  );
};
export default FormikControl;
