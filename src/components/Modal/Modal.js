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
        <img
          id="modal-icon"
          src="./images/main-layout/sign-out.png"
          alt="icon"
        />
        <h3>Sign Out</h3>
        <p>Are you sure you want to sign out?</p>
        <FilledButton
          backgroundColor={props.backgroundColor}
          display="none"
          id="modal-btn"
          btnTxt="Sign Out"
        />
      </div>
    </div>
  );
};

export default Modal;
