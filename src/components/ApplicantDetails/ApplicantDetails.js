import "./ApplicantDetails.css";
import Chip from "../Chip/Chip";
import FilledButton from "../FilledButton/FilledButton";

const ApplicantDetails = (props) => {
  return (
    <div className="applicant-details">
      <h1>Applicant Details</h1>
      <div className="row-container">
        <img
          id="applicant-pp"
          src="./images/main-layout/james-reid.png"
          alt="profile-picture"
        />
        <div className="applicant-information">
          <div className="row-container">
            <h3>James Reid</h3>
            <Chip />
          </div>
          <div className="row-container">
            <img
              id="applicant-email-img"
              src="./images/main-layout/email-icon.png"
              alt="email-icon"
            />
            <p id="applicant-email">reid.james@gmail.com | April 21, 2022</p>
          </div>
          <FilledButton
            btnImgPath="./images/main-layout/download-icon.png"
            displayBtnImg="inline"
            btnTxt="Download CV"
            id="applicant-details-download-btn"
            display="none"
          />
        </div>
      </div>
      <h4>Software Developer Application Status</h4>
    </div>
  );
};

export default ApplicantDetails;
