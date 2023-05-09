import { Link } from "react-router-dom";
import "./FilledButton.css";

const FilledButton = (props) => {
  return (
    <div
      style={{ visibility: props.btnDisplay }}
      className="filled-button-container"
    >
      <button
        style={{
          backgroundColor: props.backgroundColor,
          borderColor: props.backgroundColor,
        }}
        onClick={props.onClick}
        id={props.id}
        type={props.type}
        className="filled-button"
      >
        <img
          id="filled-button-img"
          style={{ display: props.displayBtnImg }}
          src={props.btnImgPath}
          alt=""
        />
        {props.btnTxt}
      </button>

      <div
        style={{ display: props.display, visibility: props.errorVisibility }}
        className="row-container error-prompt"
      >
        <img src="./images/login-page/error-icon.png" alt="error-icon" />
        <p>Incorrect username or password.</p>
      </div>
    </div>
  );
};

export default FilledButton;
