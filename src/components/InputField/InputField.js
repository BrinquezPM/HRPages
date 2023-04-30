import "./InputField.css";
import { useState } from "react";

const InputField = (props) => {
  const [originalType, setOriginalType] = useState(props.type);
  const [type, setType] = useState(props.type);
  function handleInputBorderColor() {
    if (!props.touched) return "black";
    else if (props.errorVisibility === "visible") return "red";
    else return "green";
  }

  function togglePassword() {
    if (type === "text") {
      setType("password");
    } else if (type === "password") {
      setType("text");
    }
  }

  return (
    <div className="input-field">
      <label htmlFor="">{props.field}</label>
      <div
        className="input-field-container"
        style={{ borderColor: handleInputBorderColor() }}
      >
        <img id="prefix-icon" src={props.prefixIcon} alt="prefix-icon" />
        <input
          type={type === "" ? "text" : type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          onBlur={props.onBlur}
        />
        <button
          type="button"
          onClick={
            originalType === "password" ? togglePassword : props.suffixFunction
          }
        >
          <img src={props.suffixIcon} alt="suffix-icon" />
        </button>
      </div>
      <div
        style={{ visibility: props.errorVisibility }}
        className="row-container error-prompt"
      >
        <img src="./images/login-page/error-icon.png" alt="error-icon" />
        <p>{props.errorMessage}</p>
      </div>
    </div>
  );
};

export default InputField;
