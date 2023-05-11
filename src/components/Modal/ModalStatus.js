import "./Modal.css";
import FilledButton from "../FilledButton/FilledButton";

const Modal = (props) => {
  const fieldDisplay = props.field === "visible" ? "block" : "none";
  const iconDisplay = props.iconDisplay ? props.iconDisplay : "block";

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
        <p
          style={{
            marginBottom: props.btnTxt === "Update" ? "0" : "20px",
          }}
        >
          {props.description}
        </p>
        <form>
          <textarea
            value={props.value}
            style={{ display: fieldDisplay }}
            className="modal-textarea"
            placeholder={props.fieldTxt}
            onChange={props.onChange}
            onBlur={props.onBlur}
            name={props.name}
          ></textarea>
          <FilledButton
            backgroundColor={props.backgroundColor}
            display="none"
            id="modal-btn"
            btnTxt={props.btnTxt}
            onClick={props.onClose}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
