import "./Modal.css";
import FilledButton from "../FilledButton/FilledButton";

const ModalStatus = (props) => {
  const fieldDisplay = props.field === "visible" ? "block" : "none";
  const iconDisplay = props.iconDisplay ? props.iconDisplay : "block";
  const statusNote = document.getElementById("modal-field"); //value of textarea

  return (
    <div className="modal-new">
      <div className="overlay"></div>
      <div className="modal-contents">
        <button id="modal-close" onClick={props.onClick}>
          <img src="../../images/login-page/close.png" alt="close-icon" />
        </button>
        <img
          id="modal-icon"
          src={props.icon}
          alt="icon"
          style={{ display: iconDisplay }}
          onClick={props.onClose}
        />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <div style={{ display: fieldDisplay }}>
          <textarea
            placeholder={props.fieldTxt}
            id="modal-field"
            className="my-input"
            style={{verticalAlign: "top"}}
          />
        </div>
        <FilledButton
          backgroundColor={props.backgroundColor}
          display="none"
          id="modal-btn"
          btnTxt={props.btnTxt}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
};

export default ModalStatus;