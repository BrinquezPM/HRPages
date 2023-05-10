import "./LoginForm.css";
import InputField from "../InputField/InputField";
import FilledButton from "../FilledButton/FilledButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = (props) => {
  const [isCredentialsValid, setIsCredentialsValid] = useState(true);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  async function validateUser(username) {
    await axios
      .get(`http://localhost:55731/api/UserAPI/getUser?id=${username}`)
      .then((response) => {
        //setUser(response.data);
        console.log(response.data.user_isActive);
        if (response.data.user_isActive === true) setIsActive(true);
      });
  }

  async function notify() {
    toast.error("User does not exist", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const onSubmit = async (values) => {
    console.log("Values: ", values);

    try {
      validateUser(formik.values.username);
      isActive === true
        ? await axios
            .post("http://localhost:55731/api/token", {
              username: formik.values.username,
              password: formik.values.password,
            })
            .then((response) => {
              console.log(response.status);
              console.log(response.data);
              if (response.status === 200) {
                signIn({
                  token: response.data.access_token,
                  expiresIn: response.data.expires_in,
                  tokenType: "Bearer",
                  authState: { user: formik.values.username },
                });
                navigate("/applicants");
              }
            })
        : notify();
    } catch (err) {
      console.log("Error: ", err);
      setIsCredentialsValid(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required("Oops! You missed this one.")
        .min(8, "Oops! Username must be at least 8 characters."),
      password: Yup.string().required("Oops! You missed this one."),
    }),

    // onSubmit: async (values) => {
    //   console.log(formik.values);
    // },
    onSubmit,
  });

  function handleInputVisibility(touched, hasErrorMessage) {
    return touched && hasErrorMessage ? "visible" : "hidden";
  }

  function eraseUsername() {
    formik.setFieldValue("username", "");
  }

  return (
    <div className="login-form">
      <ToastContainer />
      <img
        id="login-logo"
        src="./images/login-page/alliance-logo.png"
        alt="alliance-logo"
      />
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          field="Username"
          placeholder="JohnDoe"
          prefixIcon="./images/login-page/account.png"
          suffixIcon="./images/login-page/close.png"
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
        <FilledButton
          btnTxt="Sign In"
          type="submit"
          errorVisibility={isCredentialsValid ? "hidden" : "visible"}
        />
      </form>
    </div>
  );
};

export default LoginForm;
