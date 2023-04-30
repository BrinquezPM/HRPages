import "./LoginForm.css";
import InputField from "../InputField/InputField";
import FilledButton from "../FilledButton/FilledButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = (props) => {
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

    onSubmit: async (values) => {
      console.log(formik.values);
    },
  });

  function handleInputVisibility(touched, hasErrorMessage) {
    return touched && hasErrorMessage ? "visible" : "hidden";
  }

  function eraseUsername() {
    formik.setFieldValue("username", "");
  }

  return (
    <div className="login-form">
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
          errorVisibility="visible"
        />
      </form>
    </div>
  );
};

export default LoginForm;
