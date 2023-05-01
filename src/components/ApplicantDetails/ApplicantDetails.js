import "./ApplicantDetails.css";
import Chip from "../Chip/Chip";
import FilledButton from "../FilledButton/FilledButton";
import StatusRow from "../StatusRow/StatusRow";
import { useState } from "react";
import Modal from "../Modal/Modal";

const ApplicantDetails = (props) => {

  const [modalNotesOpen, setModalNotesOpen] = useState(false);
  

  return (
    <div className="applicant-details" style={{marginBlockStart: -565, marginInlineStart: 315}}>
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
            <Chip statusId={2}/>
          </div>
          <div className="row-container">
            <img
              id="applicant-email-img"
              src="./images/main-layout/email-icon.png"
              alt="email-icon"
            />
            <p id="applicant-email">reid.james@gmail.com | April 21, 2022</p>
          </div>
          <div style={{display: "flex"}}>
          <FilledButton
            btnImgPath="./images/main-layout/download-icon.png"
            displayBtnImg="inline"
            btnTxt="Download CV"
            id="applicant-details-download-btn"
            display="none"
            path =""
          />
          <FilledButton
            btnImgPath="./images/main-layout/note-text-outline.png"
            displayBtnImg="inline"
            btnTxt="Notes"
            id="applicant-details-notes-btn"
            display="none"
            onClick={() => setModalNotesOpen(true)}
          />

          {modalNotesOpen && (
            <Modal
              iconDisplay = "none"
              title="Notes"
              field = "visible"
              fieldTxt = "Add notes"
              backgroundColor="#28A745"
              btnTxt="Close"
              onClick={() => setModalNotesOpen(false)}
           />
          )}
          </div>
        </div>
      </div>
      <h4>Software Developer Application Status</h4>
      <StatusRow statusName="Pre-Screened" statusNumber="1" />
      <StatusRow
        id="circular-number-disabled"
        statusName="HR Interview"
        statusNumber="2"
      />
      <StatusRow
        id="circular-number-disabled"
        statusName="Technical Interview"
        statusNumber="3"
      />
      <StatusRow
        id="circular-number-disabled"
        statusName="Final Interview"
        statusNumber="4"
      />
      <StatusRow
        id="circular-number-disabled"
        statusName="Job Offer"
        statusNumber="5"
      />
      <StatusRow
        id="circular-number-disabled"
        statusName="Accepted Job Offer"
        statusNumber="6"
      />
    </div>
  );
};

export default ApplicantDetails;
