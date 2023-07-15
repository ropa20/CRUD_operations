import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EmployeeForm.css";

const EmployeeForm = ({ history }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    FirstName: "",
    LastName: "",
    DOB: "",
    StartDate: "",
    EndDate: "",
    Description: "",
  });
  const [isEditing, setIsEditing] = useState(
    window.location.pathname.split("/")[1] === "edit" ? true : false
  );

  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    DOB: Yup.date().required("Date of Birth is required"),
    Study: Yup.string().required("Study is required"),
    StartDate: Yup.date().required("Start Date is required"),
    EndDate: Yup.date().required("End Date is required"),
    CurrentSalary: Yup.number().required("Current Salary is required"),
    Description: Yup.string().required("Description is required"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sweede.app/DeliveryBoy/Get-Employee/"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const item = data.find((item) => item.id === parseInt(id));
      if (item) {
        setInitialValues(item);
      }
    }
  }, [id, data]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      FirstName: values?.FirstName,
      LastName: values?.LastName,
      DOB: values?.DOB,
      Study: values?.Study,
      StartDate: values?.StartDate,
      EndDate: values?.EndDate,
      CurrentSalary: values?.CurrentSalary,
      Description: values?.Description,
    };

    if (isEditing) {
      try {
        const response = await axios.patch(
          `https://sweede.app/DeliveryBoy/update-Employee/${id}`,
          payload
        );
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "https://sweede.app/DeliveryBoy/Add-Employee/",
          values
        );
        navigate("/");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }

    setIsEditing(false);
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Form Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="FirstName">First Name:</label>
              <Field
                className="form-input"
                type="text"
                id="firstName"
                name="FirstName"
                disabled={!isEditing && id}
              />
              <ErrorMessage
                name="FirstName"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="LastName">Last Name:</label>
              <Field
                className="form-input"
                type="text"
                id="lastName"
                name="LastName"
                disabled={!isEditing && id}
              />
              <ErrorMessage name="LastName" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="DOB">Date of Birth:</label>
              <Field
                className="form-input"
                type="date"
                id="dob"
                name="DOB"
                disabled={!isEditing && id}
              />
              <ErrorMessage name="DOB" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="Study">Study:</label>
              <Field
                className="form-input"
                type="text"
                id="study"
                name="Study"
                disabled={!isEditing && id}
              />
              <ErrorMessage name="Study" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="StartDate">Start Date:</label>
              <Field
                className="form-input"
                type="date"
                id="startDate"
                name="StartDate"
                disabled={!isEditing && id}
              />
              <ErrorMessage
                name="StartDate"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="EndDate">End Date:</label>
              <Field
                className="form-input"
                type="date"
                id="endDate"
                name="EndDate"
                disabled={!isEditing && id}
              />
              <ErrorMessage name="EndDate" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="CurrentSalary">Current Salary:</label>
              <Field
                className="form-input"
                type="number"
                id="currentSalary"
                name="CurrentSalary"
                disabled={!isEditing && id}
              />
              <ErrorMessage
                name="CurrentSalary"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description:</label>
              <ReactQuill
                className="form-input"
                id="description"
                name="Description"
                value={values.Description}
                onChange={(value) => setFieldValue("Description", value)}
                readOnly={!isEditing && id}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    ["link", "image", "video"],
                  ],
                }}
              />
              <ErrorMessage
                name="Description"
                component="div"
                className="error"
              />
            </div>
            {id ? (
              isEditing ? (
                <>
                  <button type="submit" disabled={isSubmitting || !isValid}>
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" onClick={handleEdit}>
                  Edit
                </button>
              )
            ) : (
              <button type="submit" disabled={isSubmitting || !isValid}>
                Add
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
