import "./FileField.css";

const FileField = (props) => {
  function fileContained() {
    return !props.btnText === "Upload Photo";
  }
  return (
    <div className="file-tile">
      <p>{props.field}</p>
      <input
        id={props.name + "Id"}
        name={props.name}
        onChange={props.onChange}
        accept={props.accept}
        value={props.value}
        style={{
          width: props.inputWidth,
        }}
        type="file"
        placeholder={props.placeholder}
      />
      <label htmlFor={props.name + "Id"}>
        <div
          className="row-container file-text"
          style={{
            borderRadius: "5px",
            backgroundColor: fileContained() ? "#4E9E32" : "#065FD4",
          }}
        >
          <img
            src={
              fileContained()
                ? "./images/main-layout/success-icon.png"
                : "./images/main-layout/success-icon.png"
            }
            alt="icon"
          />
          <p id="file-btn-text">{props.btnText}</p>
        </div>
      </label>
      <div className="row-container file-validator">
        <img
          alt="icon"
          className="file-validator-icon"
          src={
            props.errorMessage === "" || fileContained()
              ? "./images/main-layout/info-icon.png"
              : "./images/login-page/error-icon.png"
          }
        />
        <p
          style={{
            color:
              props.errorMessage === "" || fileContained() ? "black" : "red",
          }}
        >
          {props.errorMessage === "" || fileContained()
            ? props.defaultMessage
            : props.errorMessage}
        </p>
      </div>
    </div>
  );
};

export default FileField;
