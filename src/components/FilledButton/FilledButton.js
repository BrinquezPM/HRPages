import "./FilledButton.css";

const FilledButton = (props) => {
  return (
    <div className="filled-button-container">
      <button id={props.id} type={props.type} className="filled-button">
        {props.btnTxt}
      </button>
      <div
        style={{ visibility: props.errorVisibility }}
        className="row-container error-prompt"
      >
        <img src="./images/login-page/error-icon.png" alt="error-icon" />
        <p>Incorrect username or password.</p>
      </div>
    </div>
  );
};

export default FilledButton;
