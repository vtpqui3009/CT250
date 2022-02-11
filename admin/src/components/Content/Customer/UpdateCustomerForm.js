import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../UI/FormikControl";
import axios from "axios";
import * as Yup from "yup";
import LoadingSpinner from "../../UI/LoadingSpinner";
const UpdateCustomerForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loadedCustomer, setLoadedCustomer] = useState({});
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const getLoadedCustomer = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `http://localhost:4000/api/v1/admin/user/${params.uid}`
        );
        const responseData = await response.data.user;
        console.log(responseData);
        setLoadedCustomer(responseData);
      };
      getLoadedCustomer();
    } catch (err) {}
  }, [params.uid]);

  const initialValues = {
    email: loadedCustomer.email,
    name: loadedCustomer.name,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name must not be empty!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required."),
  });
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const onSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("role", role);
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:4000/api/v1/admin/user/${params.uid}`,
        formData
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    navigate("/customer/manage");
    onSubmitProps.resetForm();
  };
  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
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
            label="Email"
            type="text"
            id="email"
            name="email"
          />
          <FormikControl
            className="form-control"
            errorclass="error-message"
            label="Name"
            type="text"
            id="name"
            name="name"
          />
          <div className="form-control">
            <label>Role</label>
            <select onChange={handleRoleChange}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button className="add-product__button" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
};
export default UpdateCustomerForm;
