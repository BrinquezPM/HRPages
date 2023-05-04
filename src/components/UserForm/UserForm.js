import "./UserForm.css";
import InputField from "../InputField/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import FilledButton from "../FilledButton/FilledButton";
import FileField from "../FileField/FileField";
import { redirect, useLocation } from "react-router-dom";

const UserForm = (props) => {
  let {state} = useLocation();
  const formik = useFormik({
    initialValues: {
      firstName: state.user.user_firstName,
      lastName: state.user.user_lastName,
      username: state.user.user_username,
      emailAddress: state.user.user_email,
      contactNumber: state.user.user_phoneNumber,
      password: state.user.user_password,
      confirmPassword: state.user.confirm_pass,
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

    onSubmit: (values) => {
      return redirect("/profile");
    },
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
      <h1>{state.formFunction} User</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row-container">
          <InputField
            field="First Name"
            prefixIcon="./images/login-page/account.png"
            suffixIcon="./images/login-page/close.png"
            placeholder="John"
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
            placeholder="Doe"
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
            placeholder="JohnDoe"
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
            placeholder="doe.john@alliance.ph"
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
            placeholder="09123456789"
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
        <FilledButton type="submit" id="user-btn" btnTxt={state.formFunction} />
      </form>
    </div>
  );
};

export default UserForm;
