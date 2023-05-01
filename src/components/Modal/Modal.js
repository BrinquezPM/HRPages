import "./Modal.css";
import FilledButton from "../FilledButton/FilledButton";

const Modal = (props) => {
  return (
    <div className="modal-new">
      <div className="overlay"></div>
      <div className="modal-contents">
        <button id="modal-close" onClick={props.onClick}>
          <img src="./images/login-page/close.png" alt="close-icon" />
        </button>
        <img id="modal-icon" src={props.icon} alt="icon" />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <FilledButton
          backgroundColor={props.backgroundColor}
          display="none"
          id="modal-btn"
          btnTxt={props.btnTxt}
        />
      </div>
    </div>
  );
};

export default Modal;
