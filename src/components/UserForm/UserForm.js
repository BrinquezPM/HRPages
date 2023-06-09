import "./UserForm.css";
import InputField from "../InputField/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import FilledButton from "../FilledButton/FilledButton";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = (props) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();

      try {
        const applicantData = {};
        const postRequest = await axios
          .post("http://localhost:55731/api/UserAPI/register", {
            user_firstName: formik.values.firstName,
            user_lastName: formik.values.lastName,
            user_email: formik.values.emailAddress,
            user_phoneNumber: formik.values.contactNumber,
            user_username: formik.values.username,
            user_password: formik.values.password,
            confirm_pass: formik.values.confirmPassword,
            user_isActive: true,
            user_role: "Testrole",
          })
          .then((response) => {
            if (response.status === 200) navigate("/users");
          })
          .catch((error) => {
            toast.error("Username is already taken", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(
              error.response.data.ModelStateErrors.Errors[0].ErrorMessage
            );
            //console.log(postRequest.data);
          });
      } catch (error) {
        console.log(error);
      }
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
        .min(6, "Oops! Password must be at least 6 characters long.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Missing an uppercase, lowercase, number, or symbol"
        )
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
      <ToastContainer />
      <h1>{props.formFunction} User</h1>
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
        <FilledButton type="submit" id="user-btn" btnTxt={props.formFunction} />
      </form>
    </div>
  );
};

export default UserForm;
