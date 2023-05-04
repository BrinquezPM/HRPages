import "./UserForm.css";
import InputField from "../InputField/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import FilledButton from "../FilledButton/FilledButton";
import FileField from "../FileField/FileField";
import axios from "axios";
import { useState, useEffect } from "react";

const UserForm = (props) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "http://localhost:55731/api/UserAPI/getUser?id=51d8acea-951a-45fc-b82a-f48933e80d81"
        )
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        });
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: user.user_id,
      firstName: user.user_firstName,
      lastName: user.user_lastName,
      username: user.user_username,
      emailAddress: user.user_email,
      contactNumber: user.user_phoneNumber,
      password: user.user_password,
      confirmPassword: user.user_password,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();

      try {
        const applicantData = {};
        const postRequest = await axios
          .put("http://localhost:55731/api/UserAPI/edit", {
            user_id: formik.values.id,
            user_firstName: formik.values.firstName,
            user_lastName: formik.values.lastName,
            user_email: formik.values.emailAddress,
            user_phoneNumber: formik.values.contactNumber,
            user_username: formik.values.username,
            user_password: formik.values.password,
            confirm_pass: formik.values.confirmPassword,
          })
          .catch((error) => {
            console.log(error);
            console.log(postRequest.data);
          });
      } catch (error) {
        console.log(error);
      }
      //navigate("/confirmation", { state: { firstName: values.firstName } });
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("Oops! You missed this one."),
      lastName: Yup.string().required("Oops! You missed this one."),
      username: Yup.string()
        .required("Oops! You missed this one.")
        .min(8, "Oops! Username must be at least 8 characters."),
      emailAddress: Yup.string()
        .required("Oops! You missed this one.")
        .email("Invalid email address format."),
      contactNumber: Yup.string()
        .required("Oops! You missed this one.")
        .matches(/^[0-9]+$/, "Whoops! Only digits are allowed for this field")
        .max(11, "Contact Number must exactly be 11 digits.")
        .min(11, "Contact Number must exactly be 11 digits."),
      password: Yup.string()
        .required("Oops! You missed this one.")
        .min(8, "Oops! Password must be at least 8 characters long.")
        .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match"),
      confirmPassword: Yup.string()
        .required("Oops! You missed this one.")
        .min(8, "Oops! Password must be at least 8 characters long.")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

  function handleInputVisibility(touched, hasErrorMessage) {
    return touched && hasErrorMessage ? "visible" : "hidden";
  }

  function eraseFirstName() {
    formik.setFieldValue("firstName", "");
  }

  function eraseLastName() {
    formik.setFieldValue("lastName", "");
  }

  function eraseUsername() {
    formik.setFieldValue("username", "");
  }

  function eraseEmailAddress() {
    formik.setFieldValue("emailAddress", "");
  }

  function eraseContactNumber() {
    formik.setFieldValue("contactNumber", "");
  }

  return (
    <div className="user-form">
      <h1>{props.formFunction} User</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row-container">
          <InputField
            field="First Name"
            prefixIcon="./images/login-page/account.png"
            suffixIcon="./images/login-page/close.png"
            placeholder={user.user_firstName}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            name="firstName"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.firstName,
              formik.errors.firstName
            )}
            touched={formik.touched.firstName}
            suffixFunction={eraseFirstName}
            errorMessage={formik.errors.firstName}
          />
          <InputField
            field="Last Name"
            prefixIcon="./images/login-page/account.png"
            suffixIcon="./images/login-page/close.png"
            placeholder={user.user_lastName}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.lastName,
              formik.errors.lastName
            )}
            touched={formik.touched.lastName}
            suffixFunction={eraseLastName}
            errorMessage={formik.errors.lastName}
          />
        </div>
        <div className="row-container">
          <InputField
            field="Username"
            prefixIcon="./images/login-page/account.png"
            suffixIcon="./images/login-page/close.png"
            placeholder={user.user_username}
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.username,
              formik.errors.username
            )}
            touched={formik.touched.username}
            suffixFunction={eraseUsername}
            errorMessage={formik.errors.username}
          />
          <InputField
            field="Email Address"
            prefixIcon="./images/login-page/account.png"
            suffixIcon="./images/login-page/close.png"
            placeholder={user.user_email}
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            name="emailAddress"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.emailAddress,
              formik.errors.emailAddress
            )}
            touched={formik.touched.emailAddress}
            suffixFunction={eraseEmailAddress}
            errorMessage={formik.errors.emailAddress}
          />
        </div>
        <div className="row-container">
          <InputField
            field="Contact Number"
            prefixIcon="./images/main-layout/phone.png"
            suffixIcon="./images/login-page/close.png"
            placeholder={user.user_phoneNumber}
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            name="contactNumber"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.contactNumber,
              formik.errors.contactNumber
            )}
            touched={formik.touched.contactNumber}
            suffixFunction={eraseContactNumber}
            errorMessage={formik.errors.contactNumber}
          />
          {/* <FileField field="Profile Picture" /> */}
        </div>
        <div className="row-container">
          <InputField
            field="Password"
            type="password"
            prefixIcon="./images/login-page/lock.png"
            suffixIcon="./images/login-page/eye-off.png"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.password,
              formik.errors.password
            )}
            touched={formik.touched.password}
            errorMessage={formik.errors.password}
          />
          <InputField
            field="Confirm Password"
            type="password"
            prefixIcon="./images/login-page/lock.png"
            suffixIcon="./images/login-page/eye-off.png"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            name="confirmPassword"
            onBlur={formik.handleBlur}
            errorVisibility={handleInputVisibility(
              formik.touched.confirmPassword,
              formik.errors.confirmPassword
            )}
            touched={formik.touched.confirmPassword}
            errorMessage={formik.errors.confirmPassword}
          />
        </div>
        <FilledButton type="submit" id="user-btn" btnTxt={props.formFunction} />
      </form>
    </div>
  );
};

export default UserForm;
